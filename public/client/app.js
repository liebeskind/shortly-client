
d3.custom = {};

d3.custom.barChart = function module() {

  //this is where we make D3 stuff



};
///////////////////////////////////////////////////////BEGIN OUR CODE
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
    } /////////////////// /////////////////////////////////////////////BEGIN D3 STUFF
  ).directive('d3gfx', function($http){
    return{
      restrict: 'A',
      scope: true,
      // template: '<div>yodawg this is a template</div>',
      link: function(scope, iElement, iAttrs){
        // $http.get('/links')
          // .success(function(data){
            // console.log(data);
            // 
            var diameter = 960,
                format = d3.format(",d"),
                color = d3.scale.category20c();

            var bubble = d3.layout.pack()
                .sort(null)
                .size([diameter, diameter])
                .padding(1.5);
            var svg = d3.select(".d3container").append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .attr("class", "bubble");

            d3.json("/links", function(error, root) {
              console.log(bubble.nodes(root))
              root = {children:root};
              var node = svg.selectAll(".node")
                  .data(bubble.nodes(root))
                .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) { return "translate(" + Math.random()*960 + "," + Math.random()*960 + ")"; });

              node.append("title")
                  .text(function(d) { return 'asdf' + ": " + format(123); });

              node.append("circle")
                  .attr("r", function(d) { return d.visits; })
                  .style("fill", function(d) { return color('red'); });

              node.append("text")
                  .attr("dy", ".3em")
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.title;});
            });
        // });
        // d3.select(self.frameElement).style("height", diameter + "px");

        //d3.rendersometstuff()
        // console.log(iElement);
        //iElement = svg
      }
    };
  });




