angular.module('artistsController')
  .controller('getStatus', function($scope,artistsServiceCRUD) {
      artistsServiceCRUD.getTopArtists();
      artistsServiceCRUD.getTopTracks();

    }
  );


  angular.module('artistsController')
    .controller('getStatusArtist', function($scope,artistsServiceCRUD) {
        artistsServiceCRUD.getDetailArtist();
        artistsServiceCRUD.getTopArtists();
        artistsServiceCRUD.getTopTracks();

      }
    );


    angular.module('artistsController')
      .controller('getAllAlbuns', function($scope,artistsServiceCRUD) {
          artistsServiceCRUD.getListAlbuns();
          artistsServiceCRUD.getTopArtists();
          artistsServiceCRUD.getTopTracks();

        }
      );

      angular.module('artistsController')
        .controller('getAllMusics', function($scope,artistsServiceCRUD) {
            artistsServiceCRUD.getListMusics();
            artistsServiceCRUD.getTopArtists();
            artistsServiceCRUD.getTopTracks();

          }
        );



    angular.module('artistsController')
      .controller('getStatusAlbuns', function($scope,artistsServiceCRUD) {
          artistsServiceCRUD.getDetailAlbuns();
          artistsServiceCRUD.getTopArtists();
          artistsServiceCRUD.getTopTracks();

        }
      );
