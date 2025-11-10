from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import personViewSet

router =DefaultRouter()
router.register(r'persons', personViewSet, basename='person')

urlpatterns = [
    path('', include(router.urls)),
]