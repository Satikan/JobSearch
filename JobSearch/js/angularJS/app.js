var app = angular.module('myApp', ['ngRoute'])

app.config(['$routeProvider',
       function ($routeProvider) {
           $routeProvider.
               when('/', {
                   templateUrl: 'views/home.html',
                   //controller: 'homeController'
               }).               
              otherwise({
                  redirectTo: 'views/home.html'
              });
       }]);

