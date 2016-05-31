"use strict";

(function(){
  angular
  .module("habitLog", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)

Router.$inject = ["$stateProvider"];
function Router($stateProvider){
  $stateProvider
  .state("index",{
    url: "/meditation",
    templateUrl: "/assets/html/meditation-index.html"
  })
}


})();
