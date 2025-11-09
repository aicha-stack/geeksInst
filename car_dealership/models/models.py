from database.index import db
from datetime import datetime

class Car(db.Model):
    __tablename__ = "cars"
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(150), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(12,2), nullable=False)

    sales = db.relationship('Sale', back_populates='car', cascade="all, delete-orphan")


class Salesperson(db.Model):
    __tablename__ = "salespeople"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow)

    sales = db.relationship('Sale', back_populates='salesperson', cascade="all, delete-orphan")


class Customer(db.Model):
    __tablename__ = "customers"   
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow)

   
    sales = db.relationship('Sale', back_populates='customer', cascade="all, delete-orphan")


class Sale(db.Model):
    __tablename__ = "sales"
    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    salesperson_id = db.Column(db.Integer, db.ForeignKey('salespeople.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    sale_date = db.Column(db.DateTime, default=datetime.utcnow)
    price = db.Column(db.Numeric(12,2), nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow)

  
    car = db.relationship('Car', back_populates='sales')
    salesperson = db.relationship('Salesperson', back_populates='sales')
    customer = db.relationship('Customer', back_populates='sales')
    
