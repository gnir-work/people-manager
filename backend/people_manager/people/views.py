from .models import Person
from .serializers import PersonSerializer
from rest_framework import generics, permissions


class PersonList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
