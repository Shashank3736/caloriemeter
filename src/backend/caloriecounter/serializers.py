from rest_framework import serializers
from .models import UserFoodItem

class UserFoodItemSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserFoodItem
        fields = ('__all__')
    
    def perform_create(self, serializer):
        serializer.save(user=self.context['request'].user)