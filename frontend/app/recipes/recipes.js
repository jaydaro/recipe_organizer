'use strict';

angular.module('myApp.recipes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes', {
            templateUrl: 'recipes/recipes.html',
            controller: 'RecipesCtrl'
        });
    }])

    .controller('RecipesCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.all('recipes').getList().then(function (recipes) {
            $scope.recipes = recipes;

        });

        Restangular.all('ingredients').getList().then(function (ingredients) {
            $scope.ingredients = ingredients;
        });

        //Dropzone.options.myAwesomeDropzone = {
        //paramName: "file", // The name that will be used to transfer the file
        //maxFilesize: 2, // MB
        //// accept: function(file, done) {
        //if (file.name == "justinbieber.jpg") {
        //done("Naha, you don't.");
        //}
        //            else { done(); }
        //    }
        //};


        Dropzone.options.myAwesomeDropzone = {
            init: function() {
                this.on("addedfile", function(file) { alert("Added file."); });
            }
        };

    }]);