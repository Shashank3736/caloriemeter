from rest_framework import viewsets
from .serializers import UserFoodItemSerializer
from rest_framework import permissions
from .models import UserFoodItem

# Create your views here.
class UserFoodItemViewSet(viewsets.ModelViewSet):
    serializer_class = UserFoodItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFoodItem.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)