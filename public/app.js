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
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3){
          var data = [4, 10, 15, 16, 23, 42];
          d3.select('body')
          .selectAll('main')
          .data(data)
          .enter()
          .append('div')
          .style("width", function(d){
            return d * 10 + "px"
          })
          .style({
            "background-color":"pink",
            "font-family":"Helvetica",
            "font-size":"12pt"
          })
          .text(function(d){return d })

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
  vm.update = function(meditation, index){
    Meditation.update({_id: meditation._id}, function(){
      vm.meditations.push(index, 1)
    })
  }
  vm.destroy = function(meditation, index){
     Meditation.remove({_id: meditation._id}, function(){
       vm.meditations.splice(index, 1);
     });
   };
}

})();
