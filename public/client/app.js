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
      $http.get('/links')
        .success(function(data, status){
          $scope.links = data;
        });
      $scope.stats = function(id){
        var obj = {code: id.code};
        $http.post('/clicks', JSON.stringify(obj))
          .success(function(data){
            console.log(data);
          });
      };
    })
  .controller('createCtrl',
    function($scope,$http){
      $scope.submit = function() {
        var obj = {url: this.url};
        $http.post('/links', JSON.stringify(obj))
        .success(function(data, status) {
          $scope.shortLink = data;
          $scope.shortLink.shortURL = "/" + data.code;
          $scope.shortLink.fullString = 'Heres your shitty link: http://localhost:4567/'+ data.code;
        });
      };
    }
  );

angular.module('shortly.directives')
  .directive('d3Bars', ['d3Service', function(d3Service){
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs){
        d3Service.d3().then(function(d3){
          //d3 code
        })
      }
    }
  }])






