from rest_framework import viewsets
from .serializers import UserFoodItemSerializer
from rest_framework import permissions
from .models import UserFoodItem
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

# Create your views here.
class UserFoodItemViewSet(viewsets.ModelViewSet):
    serializer_class = UserFoodItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFoodItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        queryset = UserFoodItem.objects.filter(user=request.user, date=timezone.now())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)