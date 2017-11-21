var angular = require('angular');
//var ngRoute = require('angular-route');
require('angular-route');
///var YTPlayer = require('yt-player');
YTPlayer = require('yt-player');
var uiRouter = require('angular-ui-router');

var resultss;

require('./js/angular/services/artists/');
require('./js/angular/controllers/artists/');


var app = angular.module('myApp', ['ngRoute',uiRouter, 'artistsController','artistsService']);



app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider.state('root', {
    url: "/",
    templateUrl : "views/index.html",
    controller:  "getStatus"
  });


  $stateProvider.state('albuns', {
    url: "/albuns/:id/:ids",
    templateUrl : "views/albuns.html",
    controller:   "getStatusAlbuns"
  });


  $stateProvider.state('details', {
    url: "/details/:id",
    templateUrl : "views/details.html",
    controller:   "getStatusArtist"
  });

});



app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $("#myModal2").modal('hide');
    });
});



app.controller('searchBands', function($scope, $http) {
    $scope.getSearch = function(){
      var  name =  $scope.search;
      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $scope.myData = response.data.results.artistmatches.artist;
      });
    }


});
