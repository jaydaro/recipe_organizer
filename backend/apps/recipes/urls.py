from django.conf.urls import patterns, url
from views import RecipeList, RecipeDetail

urlpatterns = patterns('',
    url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
    url('^recipes/(?P<pk>[0-9]+)/$', RecipeDetail.as_view(), name='recipe-detail'),
)