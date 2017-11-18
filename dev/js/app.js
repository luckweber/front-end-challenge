var angular = require('angular');
var ngRoute = require('angular-route');
var YTPlayer = require('yt-player');




var app = angular.module('myApp', [ngRoute]);




app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/index.html"
    })
    $routeProvider
    .when("/albuns/:id/:id", {
        templateUrl : "views/albuns.html",
        controller:   "searchAlbunsDetails"
    })
    .when("/details/:id", {
        templateUrl: "views/details.html",
        controller: "searchBandsDetails"
    });
});

app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $("#myModal2").modal('hide');
    });
});


app.controller('getTop', function($scope, $http) {

  $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
      $scope.topArtistic  = response.data.artists.artist;
  });
  $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
    $scope.topMusic  = response.data.tracks.track;
  });

  $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=2&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
    $scope.topMusicHome  = response.data.tracks.track;
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


app.controller('searchAlbunsDetails', function($scope, $http) {

       var currentLocation = decodeURI(window.location.toString());
       var paramenter  = currentLocation.split("/");
       var artist = currentLocation.split("/")[paramenter.length -2];
       var album = currentLocation.split("/")[paramenter.length-1];
       var videoID;
       var videoName;

       var opts = {
        width: '100',
        height: '50'
       }


       var player = new YTPlayer('#player', [opts]);

       $scope.play = function(e){
          videoName = $(e.currentTarget).attr("data-video-id")

         $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+videoName+"&key=AIzaSyCoLoQfQ1Y114Bjm7Z5Flq1UaafVslvKvU").then(function(response){
            videoID = response.data.items[0].id.videoId;

            player.load(videoID);
            player.play();

              $('#myModal3').modal();

              $('#myModal3').on('hidden.bs.modal', function (e) {
                   player.stop();
              });
         });

       }





       $http.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d964618b229a40df858f3efb6957d15f&artist="+artist+"&album="+album+"&format=json").then(function(response) {
          $scope.artisticName = artist;
          $scope.albumName = response.data.album.name;
          $scope.albumImage = response.data.album.image[2]['#text'];
          $scope.summary = response.data.album.wiki.summary;
          $scope.tag = response.data.album.tags.tag[0]['name'];
          $scope.url = response.data.album.url;
          $scope.musics = response.data.album.tracks.track;
          $scope.date = response.data.album.wiki.published;


          $scope.profileHead = {
            "color" : "white",
            "background-image" : "url("+response.data.album.image[5]['#text']+")",
            "background-size" : "auto",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center"
          }

          $scope.profileHeadTag = {
            "background-color" : "rgba(0,0,0,0.5)"
          }

       });


});



app.controller('searchBandsDetails', function($scope, $http) {

       var currentLocation = decodeURI(window.location.toString());
       var paramenter = currentLocation.split("/");
       var index =  paramenter.length - 1;
       var  name =  paramenter[index];

       var img = null;

      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          //$scope.myData = response.data.artist;
          $scope.name = response.data.artist.name;
          $scope.sumario = response.data.artist.bio.summary;
          $scope.wikiText = "Wiki";
          $scope.wikiLink = response.data.artist.bio.links.link.href;
          $scope.tag = response.data.artist.tags.tag[0]['name'];
          $scope.image = response.data.artist.image[2]['#text'];
          $scope.similar = response.data.artist.similar.artist;

          img = "dd";



          $scope.profileHead = {
            "color" : "white",
            "background-image" : "url("+response.data.artist.image[5]['#text']+")",
            "background-size" : "auto",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center"
          }

          $scope.profileHeadTag = {
            "background-color" : "rgba(0,0,0,0.5)"
          }



      });



      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $scope.topAlbuns= response.data.topalbums.album;
      });

      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $scope.toptrack= response.data.toptracks.track

      });



});
