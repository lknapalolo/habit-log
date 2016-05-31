"use strict";

(function(){
  angular
  .module("habitLog", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)

Router.$inject = ["$stateProvider", "$locationProvider"];
function Router($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("index",{
    url: "/meditation",
    templateUrl: "/assets/html/meditation-index.html"
  })
}


})();