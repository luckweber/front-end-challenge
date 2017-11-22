

angular.module('artistsService')
  .service('artistsServiceCRUD', ['$http','$rootScope', function($http, $rootScope) {

  this.getTopArtists = function() {
      $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
          $rootScope.topArtistic = response.data.artists.artist
      });

  };


  this.getTopTracks = function() {
    $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
      $rootScope.topMusic  = response.data.tracks.track;
    });

  };


  this.getDetailArtist = function() {


    var currentLocation = decodeURI(window.location.toString());
    var paramenter = currentLocation.split("/");
    var index =  paramenter.length - 1;
    var  name =  paramenter[index];

    var img = null;

   $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
       //$scope.myData = response.data.artist;
       $rootScope.name = response.data.artist.name;
       $rootScope.sumario = response.data.artist.bio.summary;
       $rootScope.wikiText = "Wiki";
       $rootScope.wikiLink = response.data.artist.bio.links.link.href;
       $rootScope.tag = response.data.artist.tags.tag[0]['name'];
       $rootScope.image = response.data.artist.image[2]['#text'];
       $rootScope.similar = response.data.artist.similar.artist;

       img = "dd";



       $rootScope.profileHead = {
         "color" : "white",
         "background-image" : "url("+response.data.artist.image[5]['#text']+")",
         "background-size" : "auto",
         "background-repeat": "no-repeat",
         "background-size": "cover",
         "background-position": "center"
       }

       $rootScope.profileHeadTag = {
         "background-color" : "rgba(0,0,0,0.5)"
       }

   });



   $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
       $rootScope.topAlbuns= response.data.topalbums.album;
   });

   $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist="+name+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(response) {
       $rootScope.toptrack= response.data.toptracks.track

   });

  }

  this.getDetailAlbuns = function() {
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

    $rootScope.play = function(e){
       videoName = $(e.currentTarget).attr("data-video-id")

      $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+videoName+"&key=AIzaSyCoLoQfQ1Y114Bjm7Z5Flq1UaafVslvKvU").then(function(response){
         videoID = response.data.items[0].id.videoId;

         //player.load(videoID);
         //player.play();

        var url = 'http://www.youtube.com/embed/'+videoID;

         $('#ytplayer').attr('src', url);

         $('.containerPlayer').css('visibility', 'visible');

           //$('#myModal3').modal();

           $('#myModal3').on('hidden.bs.modal', function (e) {
                //player.stop();
           });
      });

    }





    $http.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d964618b229a40df858f3efb6957d15f&artist="+artist+"&album="+album+"&format=json").then(function(response) {
       $rootScope.artisticName = artist;
       $rootScope.albumName = response.data.album.name;
       $rootScope.albumImage = response.data.album.image[2]['#text'];
       $rootScope.summary = response.data.album.wiki.summary;
       $rootScope.tag = response.data.album.tags.tag[0]['name'];
       $rootScope.url = response.data.album.url;
       $rootScope.musics = response.data.album.tracks.track;
       $rootScope.date = response.data.album.wiki.published;


       $rootScope.profileHead = {
         "color" : "white",
         "background-image" : "url("+response.data.album.image[5]['#text']+")",
         "background-size" : "auto",
         "background-repeat": "no-repeat",
         "background-size": "cover",
         "background-position": "center"
       }

       $rootScope.profileHeadTag = {
         "background-color" : "rgba(0,0,0,0.5)"
       }

    });
  }


}]);
