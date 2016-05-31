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


Router.$inject = ["$stateProvider", "$locationProvider"];
function Router($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("index",{
    url: "/meditation",
    templateUrl: "/assets/html/meditation-index.html",
    controller: "Index",
    controllerAs: "IndexVm"
  })
}

MeditationFactory.$inject = ["$resource"];
function MeditationFactory($resource){
  var Meditations = $resource("/api/meditations", {}, {
    update: {method: "PUT"}
  });
  return Meditations;
}

IndexCtrl.$inject = ["Meditation", "$stateParams", "$state"];
function IndexCtrl(Meditation, $stateParams, state){
  var vm = this;
  vm.meditations = Meditation.query();
}

})();
