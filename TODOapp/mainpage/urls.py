from django.conf.urls import url
from mainpage.views import index

urlpatterns = [
    url(r'^$', index, name='index'),
]
