import json
from django.test import override_settings

from django.urls import reverse

from .setup import TestSetup

class WordsCRUDTests(TestSetup):    
    def setUp(self):
        super().setUp()
        loginres = self.client.post(self.login_url,{"username": "saivineeth", "password":"test@123"})
        tokens = json.loads(loginres.content).get("tokens")
        acesstoken = tokens.get("access")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {acesstoken}')
         

    def test_createword(self):
        data = {"word":"new test word"}
        res = self.client.post(reverse("userwordscrud"),data)

    def test_createwords(self):
        data = [
                {'word':'foo'},
                {'word':'fizz'}
            ]
        res = self.client.post(reverse("userwordscrud"),data=json.dumps(data),content_type="application/json")
        content = json.loads(res.content)        
        self.assertEqual(content[0].get("word"),"foo")
        self.assertEqual(content[1].get("word"),"fizz")

    def test_alterword(self):
        data = {"word":"altered word"}
        res = self.client.put(reverse("userwordscrud",kwargs={'id':1}),data)
        content = json.loads(res.content)  
        self.assertEqual(content.get("word"),"altered word")

    def test_alterword_otheruser(self):
        data = {"word":"altered word"}
        res = self.client.put(reverse("userwordscrud",kwargs={'id':6}),data)
        self.assertEqual(res.status_code,404)

    def test_deleteword_otheruser(self):
        data = {"word":"altered word"}
        res = self.client.put(reverse("userwordscrud",kwargs={'id':6}),data)
        self.assertEqual(res.status_code,404)

    def test_deleteword(self):
        res = self.client.delete(reverse("userwordscrud",kwargs={'id':1}))        
        self.assertEqual(res.status_code,204)
    
