from django.shortcuts import render
from .models import Person
from .serializers import PersonSerializer
from rest_framework import viewsets
# Create your views here.

class personViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer