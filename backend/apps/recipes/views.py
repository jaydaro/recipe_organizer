from rest_framework import generics
from serializers import RecipeSerializer, IngredientSerializer
from models import Recipe, Ingredient


class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class AddRecipe(generics.CreateAPIView):
    serializer_class = RecipeSerializer


class IngredientsList(generics.ListAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()


