"use strict";

(function(){
  angular
  .module("habitLog", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .controller("Index", IndexCtrl)
  .factory("Meditation", MeditationFactory)

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
