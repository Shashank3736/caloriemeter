from rest_framework import serializers
from .models import UserFoodItem
import os, json, requests

class UserFoodItemSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    class Meta:
        model = UserFoodItem
        fields = ('__all__')
        read_only_fields = ('calorie',)
    
    def perform_create(self, serializer):
        serializer.save(user=self.context['request'].user)

    def create(self, validated_data):
        food_name = validated_data['name']
        api_url = 'https://api.api-ninjas.com/v1/nutrition?query='
        api_request = requests.get(api_url + food_name, headers={'X-Api-Key': str(os.environ['API_NINJA_KEY'])})
        try: 
            api = json.loads(api_request.content)
            if api[0]:
                cal = 0
                for data in api:
                    cal += data['calories']
                validated_data['calorie'] = round(cal, 2)
            return super().create(validated_data)
        except:
            raise serializers.ValidationError({'name': 'Food not found.'})