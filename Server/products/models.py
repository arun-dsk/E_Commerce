from mongoengine import Document, StringField, FloatField, ListField, IntField, DateTimeField
from datetime import datetime

class Product(Document):
    meta = {
        'collection': 'products'
    }

    product_id = StringField(required=True, unique=True)
    name = StringField(required=True)
    rating = FloatField(default=0)
    description = StringField()
    price = IntField(required=True)
    offerPrice = IntField()
    image = ListField(StringField())
    category = StringField()
    date = IntField()