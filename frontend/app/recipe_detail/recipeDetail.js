'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe_detail/recipe_detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$location','$route', 'Restangular', function ($scope, $routeParams, $location, $route, Restangular) {
        $scope.recipeId = $routeParams.recipeId;

        $scope.editing = false;

        $scope.saveEditedRecipe = function () {
            Restangular.one('recipes', $scope.recipeId).customPUT($scope.recipe).then(function (recipe){
                alert("Your recipe was successfully edited");
                $scope.recipe = recipe;
                $scope.editing = false;
            });
        };

        $scope.cancelEdit = function () {
            $route.reload();
        }

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (recipe) {
            $scope.recipe = recipe;
        });

        $scope.deleteRecipe = function () {
            var confirmation = confirm("Are you sure that you want to delete this recipe? This cannot be undone.");

            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                    alert("Your recipe was successfully deleted!");
                    $location.path('/recipes');
                },
                function () {
                    alert("There was a problem deleting the recipe! :(");
                });
            };
        };

    }]);