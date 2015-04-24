'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe_detail/recipe_detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$location', '$route', 'Restangular', function ($scope, $routeParams, $location, $route, Restangular) {
        $scope.recipeId = $routeParams.recipeId;

        $scope.editing = false;

        Restangular.all('ingredients').getList().then(function (ingredients) {
            $scope.ingredients = ingredients;
        });

        $scope.saveEditedRecipe = function () {
            $scope.recipe.photo = null;
            Restangular.one('recipes', $scope.recipeId).customPUT($scope.recipe).then(function (recipe) {
                alert("Your recipe was successfully edited");
                $scope.recipe = recipe;
                $scope.editing = false;
            });
        };

        $scope.cancelEdit = function () {
            $route.reload();
        };

        $scope.addIngredient = function (ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';
        };

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (recipe) {
            $scope.recipe = recipe;
        });

        $scope.deleteRecipe = function () {
            var confirmation = vex.dialog.confirm
            message: 'Are you sure that you want to delete this recipe? This cannot be undone.'
            return (value)

            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                        alert("Your recipe was successfully deleted!");
                        $location.path('/recipes');
                    },
                    function () {
                        alert("There was a problem deleting the recipe! :(");
                    });
            }

        };

        $scope.addIngredientToRecipe = function (ingredientName) {
            if (ingredientName == null) {
                $scope.ingredientName = null;
            }

            else {
                var ingredient = {name: ingredientName};
                $scope.recipe.ingredients.push(ingredient);
                $scope.ingredientName = null;
            }
            ;
        };

        $scope.removeIngredient = function (index) {
            $scope.recipe.ingredients.splice(index, 1);
        }

        $scope.searchIngredients = function () {
        };


    }]);