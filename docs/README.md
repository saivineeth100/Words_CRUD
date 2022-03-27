# Words_CRUD

## Run Tests

```py manage.py test```

Hosted at -  https://saivineeth.pythonanywhere.com/

- All Existing words are listed in Home Page
- We can create words by posting to /api/words/
- We can alter words by put to /api/words/{id}
- We can delete words by delete to /api/words/{id}
- We can view all words without login but for create, Alter , delete we require to login and only the account created the word can alter/ delete the word

## Sample Login Credentials

|   UserName    | Password      |
| ------------- | ------------- |
| saivineeth    | test@123      |
| testuser1     | test@123      |

## Screenshots

- No Login
![No Login](/docs/screenshots/NoLogin.png)
- Login
![Login](/docs/screenshots/Login.png)
- Signup
![Signup](/docs/screenshots/Signup.png)
- Login as User 1
![Login User 1](/docs/screenshots/Login_user1.png)
- Login as User 2
![Login User 2](/docs/screenshots/login_user2.png)
- Add Word
![Add Word](/docs/screenshots/AddWord.png)
- Edit Word
![Edit Word](/docs/screenshots/EditWord.png)
- Delete Word
![Delete Word](/docs/screenshots/DeleteWord.png)