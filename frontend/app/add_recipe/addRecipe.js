'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add_recipe', {
            templateUrl: 'add_recipe/add_recipe.html',
            controller: 'AddRecipeCtrl'
        });
    }])

    .controller('AddRecipeCtrl', ['$scope', '$route', 'Restangular', function ($scope, $route, Restangular) {
        $scope.recipe = {
            ingredients: []
        };

        Restangular.all('ingredients').getList().then(function (ingredients) {
            $scope.ingredients = ingredients;
        });

        //$scope.addIngredientToRecipe = function(ingredientName) {
        //     if (ingredientName == null) {
        //        $scope.ingredientName = null;
        //    }
        //
        //    else {
        //        var ingredient = {name: ingredientName};
        //        $scope.recipe.ingredients.push(ingredient);
        //        $scope.ingredientName = null;
        //    };
        //
        //};

        $scope.addIngredientToRecipe = function(ingredientName) {
             if (ingredientName != null) {
                var ingredient = {name: ingredientName};
                $scope.recipe.ingredients.push(ingredient);
                $scope.ingredientName = null;
            }
        };

        $scope.addRecipe = function () {
            Restangular.all('add_recipe').customPOST($scope.recipe).then(function (recipe) {
                toastr.success("Your recipe was successfully created! The recipe id is " + recipe.id);
                $route.reload();
                //$scope.recipe = {}

                },
                function () {
                    toastr.error("There was problem creating the recipe, try again later");
                }
            );
        };

        $scope.removeIngredient = function (index) {
                $scope.recipe.ingredients.splice(index, 1);
        }

        $scope.addIngredientFromList = function () {
        //    need to figure logic to grey out or remove ingredients already in recipe
        }



    }]);