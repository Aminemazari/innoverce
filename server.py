import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from ultralytics import YOLO
import cloudinary
import cloudinary.uploader
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from models import db, TramRoute
import random

# Load environment variables
load_dotenv()

# Flask app setup
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'Uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://user:pass@localhost:5432/trams')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Load YOLOv8 model (auto-downloads yolov8n.pt if not cached)
try:
    yolo_model = YOLO('yolov8n.pt')  # Standard YOLOv8 nano model, auto-downloaded
except Exception as e:
    raise Exception(f"Model loading failed: {str(e)}")

# Helper to load and decode image from URL
def load_image_from_url(url):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        image_data = BytesIO(response.content)
        pil_image = Image.open(image_data).convert("RGB")
        image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        return image, "url"
    except Exception as e:
        raise ValueError(f"Image decoding failed: {str(e)}")

# Helper to load static image
def load_static_image(image_path='traffic.jpg'):
    if not os.path.exists(image_path):
        raise ValueError(f"Static image not found: {image_path}")
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Failed to load static image: {image_path}")
    return image, "static"

# Count vehicles using YOLO model
def count_vehicles(image, model):
    results = model(image)[0]
    vehicle_classes = ['car', 'truck', 'bus', 'motorbike']
    n_cars = sum(1 for c in results.boxes.cls if model.names[int(c)] in vehicle_classes)
    return n_cars, results

# Calculate green light time Tg
def calculate_tg(n_cars, Tb, k, n_avr):
    base_time = Tb + k * (n_cars - n_avr)
    if n_cars >= 2 * n_avr:
        Tg = 0.7 * base_time
    else:
        Tg = base_time
    return {
        'Tg': round(Tg, 2),
        'Tb': Tb,
        'k': k,
        'n_cars': n_cars,
        'n_avr': n_avr
    }

# ITSS endpoint to process traffic image
@app.route('/itss/traffic', methods=['POST'])
def itss_traffic():
    try:
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400

        data = request.get_json()
        image_url = data.get('url')
        Tb = float(data.get('Tb', 20))
        k = float(data.get('k', 2))
        n_avr = float(data.get('n_avr', 9))

        image = None
        image_source = None
        cloudinary_url = None

        # Process image from URL or fallback to static image
        if image_url:
            try:
                image, image_source = load_image_from_url(image_url)
            except Exception as e:
                return jsonify({'error': str(e)}), 400
        else:
            try:
                image, image_source = load_static_image('traffic.jpg')
            except Exception as e:
                return jsonify({'error': 'No URL provided and fallback traffic.jpg not found'}), 400

        if image is None:
            return jsonify({'error': 'Failed to process image'}), 400

        # Count vehicles and calculate Tg
        n_cars, results = count_vehicles(image, yolo_model)
        output = calculate_tg(n_cars, Tb, k, n_avr)

        # Annotate the image
        annotated = results.plot()
        cv2.putText(annotated, f'Vehicles detected: {n_cars}', (30, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.1, (255, 255, 0), 3)

        # Convert annotated image to bytes for Cloudinary upload
        _, buffer = cv2.imencode('.jpg', annotated)
        image_bytes = BytesIO(buffer)

        try:
            upload_result = cloudinary.uploader.upload(
                image_bytes,
                folder="smart_mobility/itss",
                resource_type="image"
            )
            cloudinary_url = upload_result['secure_url']
        except Exception as e:
            return jsonify({'error': f'Cloudinary upload failed: {str(e)}'}), 500

        return jsonify({
            'status': 'success',
            'source': image_source,
            'result': output,
            'image_url': image_url if image_source == "url" else None,
            'annotated_image': cloudinary_url
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Fake feature generator
def generate_fake_features():
    return [round(random.uniform(0.4, 0.8), 2) for _ in range(10)]

# Placeholder predict_priority function
def predict_priority(features):
    # Placeholder: Returns random priority score between 0 and 1
    # Replace with your actual model (e.g., joblib-loaded classifier)
    return round(random.uniform(0, 1), 2)

# Populate database with tram routes if empty
def populate_db_if_empty():
    if TramRoute.query.first() is None:
        trajects = [
            "Gare Routière Sidi Maârouf → Hai Sabah",
            "Hai Sabah → Hai El Yasmine",
            "Hai El Yasmine → Bd Pépinière",
            "Bd Pépinière → Université USTO",
            "Université USTO → Hôpital 1er Novembre",
            "Hôpital 1er Novembre → Cité USTO",
            "Cité USTO → Trois Cliniques",
            "Trois Cliniques → Palais De Justice",
            "Palais De Justice → Mosquée Ibn Badis",
            "Mosquée Ibn Badis → Les Castors",
            "Les Castors → Maâlem Bentayeb",
            "Maâlem Bentayeb → Les Frères Moulay",
            "Les Frères Moulay → Bd Colonel Ahmed Ben Abderrezak",
            "Bd Colonel Ahmed Ben Abderrezak → Gare SNTF",
            "Gare SNTF → Emir Abdelkader",
            "Emir Abdelkader → Place 1er Novembre",
            "Place 1er Novembre → Place Mokrani",
            "Place Mokrani → Houha Tlemcen",
            "Houha Tlemcen → M'dina El Djadida",
            "M'dina El Djadida → Ghaouti",
            "Ghaouti → Palais Des Sports",
            "Palais Des Sports → Sûreté de Wilaya",
            "Sûreté de Wilaya → Cité Universitaire Haï El Badr",
            "Cité Universitaire Haï El Badr → Jardin Othmania",
            "Jardin Othmania → Lycée Les Palmiers",
            "Lycée Les Palmiers → Cité Volontaire ENSET",
            "Cité Volontaire ENSET → Université Docteur TALEB",
            "Université Docteur TALEB → Moulay Abdelkader",
            "Moulay Abdelkader → Senia Centre",
            "Senia Centre → Senia Sud",
            "Senia Sud → Senia Université"
        ]

        for t in trajects:
            features = generate_fake_features()
            route = TramRoute(
                route_name=t,
                column1=str(features[0]),
                column2=str(features[1]),
                column3=str(features[2]),
                column4=str(features[3]),
                column5=str(features[4]),
                column6=str(features[5]),
                column7=str(features[6]),
                column8=str(features[7]),
                column9=str(features[8]),
                column10=str(features[9])
            )
            db.session.add(route)
        db.session.commit()
        print("Database populated with tram routes.")

# Endpoint to get tram routes with predicted priorities
@app.route('/Maintenance/', methods=['GET'])
def get_trajects():
    try:
     
        routes = TramRoute.query.all()
        if routes:
            predictions = []
            for route in routes:
                features = [float(getattr(route, f'column{i+1}')) for i in range(10)]
                priority = predict_priority(features)
                predictions.append({
                    'route_name': route.route_name,
                    'features': features,
                    'priority': priority
                })
        else:
            trajects = [
                "Gare Routière Sidi Maârouf → Hai Sabah",
                "Hai Sabah → Hai El Yasmine",
                "Hai El Yasmine → Bd Pépinière",
                "Bd Pépinière → Université USTO",
                "Université USTO → Hôpital 1er Novembre",
                "Hôpital 1er Novembre → Cité USTO",
                "Cité USTO → Trois Cliniques",
                "Trois Cliniques → Palais De Justice",
                "Palais De Justice → Mosquée Ibn Badis",
                "Mosquée Ibn Badis → Les Castors",
                "Les Castors → Maâlem Bentayeb",
                "Maâlem Bentayeb → Les Frères Moulay",
                "Les Frères Moulay → Bd Colonel Ahmed Ben Abderrezak",
                "Bd Colonel Ahmed Ben Abderrezak → Gare SNTF",
                "Gare SNTF → Emir Abdelkader",
                "Emir Abdelkader → Place 1er Novembre",
                "Place 1er Novembre → Place Mokrani",
                "Place Mokrani → Houha Tlemcen",
                "Houha Tlemcen → M'dina El Djadida",
                "M'dina El Djadida → Ghaouti",
                "Ghaouti → Palais Des Sports",
                "Palais Des Sports → Sûreté de Wilaya",
                "Sûreté de Wilaya → Cité Universitaire Haï El Badr",
                "Cité Universitaire Haï El Badr → Jardin Othmania",
                "Jardin Othmania → Lycée Les Palmiers",
                "Lycée Les Palmiers → Cité Volontaire ENSET",
                "Cité Volontaire ENSET → Université Docteur TALEB",
                "Université Docteur TALEB → Moulay Abdelkader",
                "Moulay Abdelkader → Senia Centre",
                "Senia Centre → Senia Sud",
                "Senia Sud → Senia Université"
            ]
            predictions = []
            for t in trajects:
                features = generate_fake_features()
                priority = predict_priority(features)
                predictions.append({
                    'route_name': t,
                    'features': features,
                    'priority': priority
                })

        return jsonify({
            'status': 'success',
            'trajects': predictions
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize DB and run
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    with app.app_context():
        db.create_all()
        populate_db_if_empty()
    app.run(debug=False, host='0.0.0.0', port=port)