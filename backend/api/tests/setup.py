from unicodedata import name
from rest_framework.test import APITestCase

from django.urls import reverse

class TestSetup(APITestCase):
    fixtures = ['words']
    def setUp(self):
        self.login_url = reverse("loginurl")
        self.signup_url = reverse("signupurl")
        return super().setUp()

    def tearDown(self):
        return super().tearDown()