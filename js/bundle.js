var app = angular.module('myApp', ["ngRoute"]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/index.html"
    })
    $routeProvider
    .when("/albuns/:id/:id", {
        templateUrl : "pages/albuns.html",
        controller:   "searchAlbunsDetails"
    })
    .when("/details/:id", {
        templateUrl: "pages/details.html",
        controller: "searchBandsDetails"
    });
});

app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
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

       var artist = currentLocation.split("/")[6];
       var album = currentLocation.split("/")[7];


       $http.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d964618b229a40df858f3efb6957d15f&artist="+artist+"&album="+album+"&format=json").then(function(response) {
          $scope.artisticName = artist;
          $scope.albumName = response.data.album.name;
          $scope.albumImage = response.data.album.image[2]['#text'];
          $scope.summary = response.data.album.wiki.summary;
          $scope.tag = response.data.album.tags.tag[0]['name'];
          $scope.url = response.data.album.url;
          $scope.musics = response.data.album.tracks.track;
          $scope.date = response.data.album.wiki.published;

       });


});



app.controller('searchBandsDetails', function($scope, $http) {

       var currentLocation = decodeURI(window.location.toString());
       var paramenter = currentLocation.split("/")[6];

       var  name =  paramenter;

      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          //$scope.myData = response.data.artist;
          $scope.name = response.data.artist.name;
          $scope.sumario = response.data.artist.bio.summary;
          $scope.wikiText = "Wiki";
          $scope.wikiLink = response.data.artist.bio.links.link.href;
          $scope.tag = response.data.artist.tags.tag[0]['name'];
          $scope.image = response.data.artist.image[2]['#text'];
          $scope.similar = response.data.artist.similar.artist;

      });


      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $scope.topAlbuns= response.data.topalbums.album;
      });

      $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $scope.toptrack= response.data.toptracks.track

      });

});
