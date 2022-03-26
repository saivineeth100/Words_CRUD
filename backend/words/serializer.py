
from rest_framework import serializers

from words.models import Word

class WordSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Word
        extra_kwargs ={"author": {'required':False}}
        fields = '__all__' 

    def create(self, validated_data):
        validated_data['author'] = self.context["request"].user
        return super().create(validated_data)