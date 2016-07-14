//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

//SERVICES
weatherApp.service('weatherService', function() {
    this.city = "";
});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'weatherService', function($scope, weatherService) {
    $scope.city = weatherService.city;

    $scope.$watch('city', function() {
        weatherService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {
    $scope.city = weatherService.city;
    $scope.days = $routeParams.days || '3';

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=96e250dc8025a13bb73b703facfd689b', { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    console.log($scope.weatherResult);

    $scope.convertToDegree = function(kelvin) {
        return Math.round(kelvin-273.15);
    }

    $scope.convertToDate = function(date) {
        return new Date(date * 1000);
    }
}]);
