from django.db import models
from django.conf import settings
# Create your models here.

class Word(models.Model):
    word = models.CharField(max_length=100)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='words')

    def __str__(self):
      return self.word

    class Meta:
      ordering = ('-id',)
        