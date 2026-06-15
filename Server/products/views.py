from rest_framework.decorators import api_view
from rest_framework.response import Response

from .s3 import upload_file_to_s3
from .models import Product


# GET ALL PRODUCTS
@api_view(['GET'])
def get_products(request):
    products = Product.objects()

    data = []
    for p in products:
        data.append({
            "product_id": p.product_id,
            "name": p.name,
            "rating": p.rating,
            "description": p.description,
            "price": p.price,
            "offerPrice": p.offerPrice,
            "image": p.image,
            "category": p.category,
            "date": p.date
        })

    return Response(data)


# GET SINGLE PRODUCT
@api_view(['GET'])
def get_product(request, pid):
    try:
        p = Product.objects.get(product_id=pid)

        return Response({
            "product_id": p.product_id,
            "name": p.name,
            "rating": p.rating,
            "description": p.description,
            "price": p.price,
            "offerPrice": p.offerPrice,
            "image": p.image,
            "category": p.category,
            "date": p.date
        })

    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)



@api_view(['POST'])
def create_product(request):
    data = request.data

    product = Product(
        product_id=data.get("product_id"),
        name=data.get("name"),
        rating=data.get("rating", 0),
        description=data.get("description"),
        price=data.get("price"),
        offerPrice=data.get("offerPrice"),
        image=data.get("image", []),
        category=data.get("category")
    )

    product.save()

    return Response({"message": "Product created successfully"})

@api_view(['POST'])
def upload_image(request):

    file = request.FILES.get("image")

    if not file:

        return Response({
            "error": "No file uploaded"
        })

    url = upload_file_to_s3(
        file,
        file.name
    )

    return Response({
        "image_url": url
    })