angular.module("artistsService").service("artistsServiceCRUD",["$http","$rootScope",function(t,a){this.getTopArtists=function(){t.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(t){a.topArtistic=t.data.artists.artist})},this.getTopTracks=function(){t.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(t){a.topMusic=t.data.tracks.track})},this.getDetailArtist=function(){var i=decodeURI(window.location.toString()).split("/"),e=i[i.length-1],o=null;t.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+e+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(t){a.name=t.data.artist.name,a.sumario=t.data.artist.bio.summary,a.wikiText="Wiki",a.wikiLink=t.data.artist.bio.links.link.href,a.tag=t.data.artist.tags.tag[0].name,a.image=t.data.artist.image[2]["#text"],a.similar=t.data.artist.similar.artist,o="dd",a.profileHead={color:"white","background-image":"url("+t.data.artist.image[5]["#text"]+")","background-size":"auto","background-repeat":"no-repeat","background-size":"cover","background-position":"center"},a.profileHeadTag={"background-color":"rgba(0,0,0,0.5)"}}),t.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=10&artist="+e+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(t){a.topAlbuns=t.data.topalbums.album}),t.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist="+e+"&api_key=d964618b229a40df858f3efb6957d15f&format=json").then(function(t){a.toptrack=t.data.toptracks.track})},this.getDetailAlbuns=function(){var i,e,o=decodeURI(window.location.toString()),r=o.split("/"),s=o.split("/")[r.length-2],d=o.split("/")[r.length-1],n=new YTPlayer("#player",[{width:"100",height:"50"}]);a.play=function(a){e=$(a.currentTarget).attr("data-video-id"),t.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+e+"&key=AIzaSyCoLoQfQ1Y114Bjm7Z5Flq1UaafVslvKvU").then(function(t){i=t.data.items[0].id.videoId,n.load(i),n.play(),$("#myModal3").modal(),$("#myModal3").on("hidden.bs.modal",function(t){n.stop()})})},t.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d964618b229a40df858f3efb6957d15f&artist="+s+"&album="+d+"&format=json").then(function(t){a.artisticName=s,a.albumName=t.data.album.name,a.albumImage=t.data.album.image[2]["#text"],a.summary=t.data.album.wiki.summary,a.tag=t.data.album.tags.tag[0].name,a.url=t.data.album.url,a.musics=t.data.album.tracks.track,a.date=t.data.album.wiki.published,a.profileHead={color:"white","background-image":"url("+t.data.album.image[5]["#text"]+")","background-size":"auto","background-repeat":"no-repeat","background-size":"cover","background-position":"center"},a.profileHeadTag={"background-color":"rgba(0,0,0,0.5)"}})}}]);