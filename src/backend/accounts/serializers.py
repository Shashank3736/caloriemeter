from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import CustomUser as User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'password', 'max_calories')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        password = validated_data.get('password')
        if password:
            user = User.objects.get(username=instance.username)
            user.set_password(password)
            user.save()
        return instance
    
    def get_max_calories(self, obj):
        return obj.max_calories if self.context['request'].user.id == obj.id else None
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context['request'].user != instance:
            representation['email'] = None
            representation['max_calories'] = None
        return representation

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')