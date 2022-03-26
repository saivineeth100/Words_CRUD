from pyexpat import model
from django.shortcuts import render
from django.views.generic import TemplateView

from rest_framework.generics import GenericAPIView


from words.models import Word
from words.serializer import WordSerializer

from api.views import CRUDAPIView,ListModelMixin


class WordCRUDView(CRUDAPIView):
    model = Word
    lookup_field = "id"
    serializer_class = WordSerializer

    def get_queryset(self):
        return self.request.user.words.all()

class WordsListView(GenericAPIView,ListModelMixin):
    permission_classes = []
    model = Word
    serializer_class = WordSerializer

    def get_queryset(self):
        return self.model.objects.all()


class FrontEndView(TemplateView):
    template_name = "words/index.html"