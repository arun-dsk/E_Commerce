from rest_framework import serializers

class ProductSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    name = serializers.CharField()
    rating = serializers.FloatField()
    description = serializers.CharField()
    price = serializers.IntegerField()
    offerPrice = serializers.IntegerField()
    image = serializers.ListField(child=serializers.CharField())
    category = serializers.CharField()
    date = serializers.DateTimeField()