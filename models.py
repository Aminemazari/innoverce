from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TramwayRoute(db.Model):
    __tablename__ = 'tramway_routes'

    id = db.Column(db.Integer, primary_key=True)
    route_name = db.Column(db.String(150), nullable=False)

    feature_1 = db.Column(db.Float)
    feature_2 = db.Column(db.Float)
    feature_3 = db.Column(db.Float)
    feature_4 = db.Column(db.Float)
    feature_5 = db.Column(db.Float)
    feature_6 = db.Column(db.Float)
    feature_7 = db.Column(db.Float)
    feature_8 = db.Column(db.Float)
    feature_9 = db.Column(db.Float)
    feature_10 = db.Column(db.Float)
    feature_11 = db.Column(db.Float)
    feature_12 = db.Column(db.Float)
    feature_13 = db.Column(db.Float)
    feature_14 = db.Column(db.Float)
    feature_15 = db.Column(db.Float)
    feature_16 = db.Column(db.Float)
    feature_17 = db.Column(db.Float)
    feature_18 = db.Column(db.Float)
    feature_19 = db.Column(db.Float)
    feature_20 = db.Column(db.Float)
    feature_21 = db.Column(db.Float)
    feature_22 = db.Column(db.Float)
    feature_23 = db.Column(db.Float)
    feature_24 = db.Column(db.Float)
    feature_25 = db.Column(db.Float)

    priority = db.Column(db.Float)

    def __repr__(self):
        return f"<TramwayRoute {self.route_name} | Priority: {self.priority}>"
