import json
from .setup import TestSetup

class AuthViewsTests(TestSetup):


    def test_Login_Emptydata(self):
        res = self.client.post(self.login_url)
        self.assertEqual(res.status_code, 400)
    
    def test_Login_Wrongdata(self):
        data = {"username": "testusernew", "password":"testwrongpassword"}
        res = self.client.post(self.login_url,data)
        self.assertEqual(res.status_code, 401)

    def test_login_Correctdata(self):
        data = {"username": "saivineeth", "password":"test@123"}
        res = self.client.post(self.login_url,data)
        self.assertEqual(res.status_code, 200)


    def test_Signup_Emptydata(self):
        res = self.client.post(self.signup_url)
        self.assertEqual(res.status_code, 400)

    def test_Signup_Partialdata(self):
        data = {"username": "testusernew", "password":"testwrongpassword"}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("password2")
        error2 = content.get("email")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error, ['This field is required.'])
        self.assertEqual(error2, ['This field is required.'])

    def test_Signup_Partialdata_noterms(self):
        data = {"username": "testusernew", "email":"test123@gmail.com", "password":"test@123","password2":"test@123"}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("error")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error, 'Must Agree terms to Signup')

    def test_Signup_Partialdata_termsasfalse(self):
        data = {"username": "testusernew", "email":"test123@gmail.com", "password":"test@123","password2":"test@123",'agreeterms':False}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("error")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error, 'Must Agree terms to Signup')

    def test_Signup_MismatchPassword(self):
        data = {"username": "testusernew","email":"test123@gmail.com", "password":"test@123","password2":"test@1234",'agreeterms':True}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("error")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error,"password_mismatch")

    def test_Signup_invalidPassword(self):
        data = {"username": "testusernew","email":"test123@gmail.com", "password":"test123","password2":"test123",'agreeterms':True}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("password")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error,['Ensure this field has at least 8 characters.'])

    def test_Signup_InvalidMail(self):
        data = {"username": "testusernew","email":"test123gmail.com", "password":"test@123","password2":"test@123",'agreeterms':True}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("email")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(error,['Enter a valid email address.'])

    def test_Signup_sucess(self):
        data = {"username": "testusernew","email":"test123@gmail.com", "password":"test@123","password2":"test@123",'agreeterms':True}
        res = self.client.post(self.signup_url,data)
        content = json.loads(res.content)
        error = content.get("error")
        self.assertEqual(res.status_code, 200)