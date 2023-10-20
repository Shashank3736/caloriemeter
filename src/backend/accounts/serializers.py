from rest_framework import serializers
from .models import CustomUser as User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'password', 'max_calories', 'profile')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        email = validated_data.get('email')
        if not email:
            validated_data['email'] = f"{validated_data['username']}@tempmailraj.com"
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
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context['request'].user != instance:
            representation['email'] = None
            representation['max_calories'] = None
        
        if representation['email'].endswith('@tempmailraj.com'):
            representation['email'] = None
        return representation

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')