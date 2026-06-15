from django.urls import path
from .views import get_products, get_product, create_product, upload_image

urlpatterns = [
    path('', get_products),
    
    path('create/', create_product),
    path('upload/', upload_image),
    path('<str:pid>/', get_product),
]