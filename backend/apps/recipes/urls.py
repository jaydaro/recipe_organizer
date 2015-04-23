from django.conf.urls import patterns, url
from django.conf import settings
from views import RecipeList, RecipeDetail, AddRecipe, IngredientsList

urlpatterns = patterns('',
    url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
    url('^recipes/(?P<pk>[0-9]+)/$', RecipeDetail.as_view(), name='recipe-detail'),
    url('^add_recipe/$', AddRecipe.as_view(), name='add_recipe'),
    url('^ingredients/$', IngredientsList.as_view(), name='ingredient-list'),
    url('^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)