from django.conf import settings
from django.contrib.auth import password_validation


from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        read_only_fields = ("is_active", "is_staff", "is_superuser", "date_joined","last_login")
        extra_kwargs = {
            "password": {"write_only": True, "required": False},
        }
        fields = '__all__'
        model = User


class SignUpSerializer(serializers.Serializer):
    helptexts = password_validation.password_validators_help_texts()
    username = serializers.CharField(min_length=5)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8,help_text=helptexts)
    password2 = serializers.CharField(min_length=8,help_text=helptexts)
    agreeterms = serializers.BooleanField(required=True)

    def is_valid(self, raise_exception=False):
        super().is_valid(raise_exception=raise_exception)
        password = self._validated_data.get('password')
        password2 = self._validated_data.get('password2')
        agreeterms = self._validated_data.get('agreeterms')
        if agreeterms is False:
            raise serializers.ValidationError(
                detail={"error": "Must Agree terms to Signup"},
                code='TermsnotAccepted',
            )
        if password != password2:
            raise serializers.ValidationError(
                detail={"error": "password_mismatch"},
                code='password_mismatch',
            )
        return not bool(self._errors)

    def addnewuser(self):
        username = self._validated_data.get('username')
        email = self._validated_data.get('email')
        password = self._validated_data.get('password')
        agreeterms = self._validated_data.get('agreeterms')

        user = User(username=username,email=email)
        user.set_password(password)
        user.save()