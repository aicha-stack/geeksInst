# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class Salespeople(db.Model):
#     __tablename__ = 'salespeople'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     phone = db.Column(db.String(20))
#     sales = db.relationship('Sales', backref='salesperson', lazy=True)

# class Sales(db.Model):
#     __tablename__ = 'sales'
    
#     id = db.Column(db.Integer, primary_key=True)
#     sale_date = db.Column(db.DateTime, nullable=False)
#     salesperson_id = db.Column(db.Integer, db.ForeignKey('salespeople.id'), nullable=False)
   