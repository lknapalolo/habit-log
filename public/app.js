"use strict";

(function(){
  angular
  .module("habitLog", [
    "ui.router",
    "ngResource",
    "d3"
  ])
  .config(Router)
  .controller("Index", IndexCtrl)
  .factory("Meditation", MeditationFactory)
  .directive("d3circles", ['d3Service', function(d3Service){
    return{
      restrict: 'EA',
      scope: {},
      replace: true,
      link: function(scope, element, attrs) {

        d3Service.d3().then(function(d3){


        var diameter = 500

        var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

        var svg = d3.select(".circles")
        .append('svg')
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")

        var data

        d3.json("/api/meditations", function(error, json){
          if(error) return console.warn(error);
          data = json;
          data = data.map(function(d){ d.value = d["minutes"]; return d; });

          var nodes = bubble.nodes({children:data}).filter(function(d) {return !d.children; });

          var bubbles = svg.append("g")
          .attr("transform", "translate(0,0)")
          .selectAll(".bubble")
          .data(nodes)
          .enter();

          bubbles.append("circle")
          .attr("r", function(d){ return d.r; })
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
          .style("fill", "#ccc")
          .on("mouseover", function(){
            d3.select(this).style({"fill":"#fff"})
          })
          .on("mouseout", function(){
            d3.select(this).style({"fill":"#ccc"})
          })

          bubbles.append("text")
          .attr("x", function(d){ return d.x;})
          .attr("y", function(d){ return d.y + 5; })
          .attr("text-anchor", "middle")
          .text(function(d) {return d.date})
          .style({
            "fill":"black",
            "font-family":"Helvetica Neue",
            "font-size":"10px"
          });
        });

      })
    }
  };
}]);


Router.$inject = ["$stateProvider", "$locationProvider",  "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("index",{
    url: "/meditation",
    templateUrl: "/assets/html/meditation-index.html",
    controller: "Index",
    controllerAs: "IndexVm"
  })
  .state("chart", {
    url:"/visualize",
    templateUrl: "/assets/html/meditation-chart.html"
  });
  $urlRouterProvider.otherwise("/")
}

MeditationFactory.$inject = ["$resource"];
function MeditationFactory($resource){
  var Meditations = $resource("/api/meditations/:_id", {}, {
    update: {method: "PUT"}
  });
  return Meditations;
}

IndexCtrl.$inject = ["Meditation"];
function IndexCtrl(Meditation){
  var vm = this;
  vm.meditations = Meditation.query();
  vm.create = function(){
    Meditation.save(vm.newMeditation, function(response){
      vm.meditations.push(response);
    })
  }

  vm.destroy = function(meditation, index){
     Meditation.remove({_id: meditation._id}, function(){
       vm.meditations.splice(index, 1);
     });
   };
}

})();
