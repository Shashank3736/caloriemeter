from accounts.views import UserViewSet, TokenViewSet, CustomAuthToken
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user_token', TokenViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),  
]

# Token viewset
urlpatterns += [
    path('api-token-auth/', CustomAuthToken.as_view())
]