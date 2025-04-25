import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cloudinary
import cloudinary.uploader
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from models import db, TramwayRoute
import random
import pickle
import torch
import torch.nn as nn

# Load environment variables
load_dotenv()

# Flask app setup
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'Uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)



# Load YOLO and classifier
yolo_model = YOLO('yolov8n.pt')
input_dim = 25  # Matches the 25 fake features
# try:
#     with open("models/priority_classifier_model.pkl", "rb") as f:
#     ```model = pickle.load(f)
#     print("Model loaded successfully")
# except Exception as e:
#     print(f"Error loading model: {str(e)}")
#     raise

# try:
#     model.eval()
# except AttributeError:
#     print("Loaded model is not a PyTorch model. Please verify the .pkl file.")
#     raise

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

def load_static_image(image_path='traffic.jpg'):
    if not os.path.exists(image_path):
        raise ValueError(f"Static image not found: {image_path}")
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Failed to load static image: {image_path}")
    return image, "static"

def count_vehicles(image, model):
    results = model(image)[0]
    vehicle_classes = ['car', 'truck', 'bus', 'motorbike']
    n_cars = sum(1 for c in results.boxes.cls if model.names[int(c)] in vehicle_classes)
    return n_cars, results

def calculate_tg(n_cars, Tb, k, n_avr):
    base_time = Tb + k * (n_cars - n_avr)
    Tg = 0.7 * base_time if n_cars >= 2 * n_avr else base_time
    return {
        'Tg': round(Tg, 2),
        'Tb': Tb,
        'k': k,
        'n_cars': n_cars,
        'n_avr': n_avr
    }

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

        image, image_source = (load_image_from_url(image_url) if image_url else load_static_image('traffic.jpg'))
        if image is None:
            return jsonify({'error': 'Failed to process image'}), 400

        n_cars, results = count_vehicles(image, yolo_model)
        output = calculate_tg(n_cars, Tb, k, n_avr)

        annotated = results.plot()
        cv2.putText(annotated, f'Vehicles detected: {n_cars}', (30, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.1, (255, 255, 0), 3)

        _, buffer = cv2.imencode('.jpg', annotated)
        image_bytes = BytesIO(buffer)

        upload_result = cloudinary.uploader.upload(
            image_bytes,
            folder="smart_mobility/itss",
            resource_type="image"
        )
        cloudinary_url = upload_result['secure_url']

        return jsonify({
            'status': 'success',
            'source': image_source,
            'result': output,
            'image_url': image_url if image_source == "url" else None,
            'annotated_image': cloudinary_url
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_features():
    return [round(random.uniform(0.4, 0.8), 2) for _ in range(input_dim)]

# def predict_priority(features):
#     # Convert features to PyTorch tensor
#     features_tensor = torch.tensor(features, dtype=torch.float32).reshape(1, -1)
    
#     # Get model prediction (logits)
#     with torch.no_grad():
#       #  logits = model(features_tensor)
    
#     # Apply softmax to get probabilities
#    # probs = torch.softmax(logits, dim=1).numpy()[0]
    
#     # Return probability of the highest priority class (assuming last class is "High")
#    # return round(float(probs[-1]), 2)

def populate_db_if_empty():
    if TramwayRoute.query.first() is None:
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
            features = generate_features()
            route = TramwayRoute(route_name=t, **{f'feature_{i+1}': str(features[i]) for i in range(input_dim)})
            db.session.add(route)
        db.session.commit()
        print("Database populated with tram routes.")

@app.route('/Maintenance/', methods=['GET'])
def get_trajects():
    try:
        routes = TramwayRoute.query.all()
        predictions = []
        for route in routes:
            features = [float(getattr(route, f'column{i+1}')) for i in range(input_dim)]
            priority = predict_priority(features)
            predictions.append({
                'route_name': route.route_name,
                'features': features,
                'priority': priority
            })

        return jsonify({
            'status': 'success',
            'trajects': predictions
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    with app.app_context():
        db.create_all()
        populate_db_if_empty()
    app.run(debug=False, host='0.0.0.0', port=port)