'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add_recipe', {
            templateUrl: 'add_recipe/add_recipe.html',
            controller: 'AddRecipeCtrl'
        });
    }])

    .controller('AddRecipeCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        $scope.recipe = {
            ingredients: []
        };

        $scope.addIngredientToRecipe = function(ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';
        }


        $scope.addRecipe = function () {
            Restangular.all('add_recipe').customPOST($scope.recipe).then(function (recipe) {
                alert("Your recipe was successfully created! The recipe id is " + recipe.id);
                $scope.recipe = {}

                },
                function () {
                    alert("There was problem creating the recipe, try again later");
                }
            )
        }

    }]);