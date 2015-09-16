
var app = angular.module('exampleApp',['ngRoute','customerQ']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({
        redirectTo : '/signin'
    });
    $routeProvider.when('/signin', {
        templateUrl : 'login/signin.html',
        controller:'SignInCtrl'

    })
     .when('/register', {
            templateUrl : 'login/register.html'

    })
    .when('/customerqueue', {
        templateUrl : 'customerQ/customer.html'
    })

}])

app.controller('SignInCtrl',function($scope,$location,$rootScope){
    $scope.signIn = function(data){
       if(data.username === "admin@gmail.com"){
           $rootScope.role = "admin";
           $location.path('/customerqueue')
          // $scope.$apply();
        }
        else{
           $rootScope.role = "user";
       }


    }
})