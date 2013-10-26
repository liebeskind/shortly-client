angular.module('shortly', [])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/index.html',
        controller: 'homeCtrl'
      })
      .when('/create', {
        templateUrl: 'templates/create.html',
        controller: 'createCtrl'
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
    })
  .controller('createCtrl',
    function($scope,$http){
      $scope.submit = function() {
        var obj = {url: this.url};
        $http.post('/links', JSON.stringify(obj))
        .success(function(data, status) {
          console.log(data);
          $scope.shortLink = data;
          $scope.shortLink.shortURL = "/" + data.code;
          $scope.shortLink.fullString = 'Heres your shitty link: http://localhost:4567/'+ data.code;
        });
      };
    }
  );