
from django.urls import path,re_path



from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenVerifyView
from words.views import WordsListView
from words.views import WordCRUDView
from api.views import LoginView,SignupView

urlpatterns = [
    path('words/all/',WordsListView.as_view(),name="getallwords"),
    path('words/',WordCRUDView.as_view(),name="userwordscrud"),
    path('words/<int:id>',WordCRUDView.as_view(),name="userwordscrud"),
    path('words/<str:word>',WordCRUDView.as_view(),name="userwordscrud"),
    path('auth/login/',LoginView.as_view(),name="loginurl"),
    path('auth/signup/', SignupView.as_view(),name="signupurl"),
    path('auth/refreshtoken/', TokenRefreshView.as_view(),name="refreshtoken"),
    path('auth/verifytoken/', TokenVerifyView.as_view(),name="verifytoken"),
]