from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import CustomUser as User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        password = validated_data.get('password', instance.password)
        user = User.objects.get(username=instance.username)
        user.set_password(password)
        user.save()
        return instance

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')