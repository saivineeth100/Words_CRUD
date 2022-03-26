
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,re_path,include
from words.views import FrontEndView
from api import urls
urlpatterns = [
    # Uncomment the next line to enable the admin:
    path('admin/', admin.site.urls),
    path('api/',include('api.urls')),
    #re_path('.*', FrontEndView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [ re_path('.*', FrontEndView.as_view())]
