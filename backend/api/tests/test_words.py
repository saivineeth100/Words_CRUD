import json
from django.test import override_settings

from django.urls import reverse

from .setup import TestSetup

class WordsTests(TestSetup):    

    def test_getallwords(self):
        data = self.client.get(reverse("getallwords"))
        content = json.loads(data.content)
        count = content.get("count")
        self.assertNotEqual(data,None)
        self.assertEqual(count,11)
