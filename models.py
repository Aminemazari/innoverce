from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TramRoute(db.Model):
    __tablename__ = 'tram_routes'

    id = db.Column(db.Integer, primary_key=True)
    route_name = db.Column(db.String(255), nullable=False)  
    
    column1 = db.Column(db.String(100))
    column2 = db.Column(db.String(100))
    column3 = db.Column(db.String(100))
    column4 = db.Column(db.String(100))
    column5 = db.Column(db.String(100))
    column6 = db.Column(db.String(100))
    column7 = db.Column(db.String(100))
    column8 = db.Column(db.String(100))
    column9 = db.Column(db.String(100))
    column10 = db.Column(db.String(100))
    column11 = db.Column(db.String(100))
    column12 = db.Column(db.String(100))
    column13 = db.Column(db.String(100))
    column14 = db.Column(db.String(100))
    column15 = db.Column(db.String(100))
    column16 = db.Column(db.String(100))
    column17 = db.Column(db.String(100))
    column18 = db.Column(db.String(100))
    column19 = db.Column(db.String(100))
    column20 = db.Column(db.String(100))
