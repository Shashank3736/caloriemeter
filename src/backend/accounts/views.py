# from django.contrib.auth.models import User
from .models import CustomUser as User
from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, TokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import IsOwnerOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)

class TokenViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    permission_classes = [permissions.IsAdminUser]

class DeleteTokenGeneric(viewsets.GenericViewSet, generics.DestroyAPIView):
    queryset = Token.objects.all()
    lookup_field = 'key'

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })