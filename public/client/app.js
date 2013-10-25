angular.module('shortly', [])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/index.html',
        controller: 'homeCtrl'
      })
      .otherwise('/',{
        templateUrl:'templates/index.html'
      });
  })
  .controller('homeCtrl',
    function($scope,$http){
      //do request
      $http.get('/links')
        .success(function(data, status){
          console.log(data);
          $scope.links = data;
        });
    });