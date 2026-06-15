import os
import sys
import django
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

django.setup()

from products.models import Product


with open("../Client/src/scripts/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)


for item in products:
    Product.objects(product_id=item["id"]).modify(
        upsert=True,
        new=True,
        set__product_id=item["id"],
        set__name=item["name"],
        set__rating=item["rating"],
        set__description=item["description"],
        set__price=item["price"],
        set__offerPrice=item["offerPrice"],
        set__image=item["image"],
        set__category=item["category"],
        set__date=item.get("date") or 1747200000,
    )

print(f"✅ Seeded {len(products)} products successfully")