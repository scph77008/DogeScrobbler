$(document).ready(function ($)
{
	//$('#submit').on('click', function ()
//		{
		//alert('wow!');

		var $user      = $('#user').val();
		var $limit     = $('#limit').val();
		var $date_from = new Date($('#date').val()).getTime() / 1000;
		var $date_to   = parseInt($date_from + 60 * 60 * 24);

		$.ajax({
			url    : 'http://ws.audioscrobbler.com/2.0/',
			data   : {
				method : 'user.getrecenttracks',
				user   : $user,
				limit  : $limit,
				from   : $date_from,
				to     : $date_to,
				api_key: '2417947c57e2d0cde512441710dcb29f',
				format : 'json'
			},
			success: function (data)
			{
				var $image;
				var $album;
				var $artist;
				var $track;
				var $date;
				var $dateUTC;
				var $charts = $('.charts');

				var $prev_album = '';
//				console.log(data.recenttracks);
				$.each((data.recenttracks.track), function(id, track)
				{

					$image = track['image'][3]['#text']; // extralarge, 300x300px
					$album = track['album']['#text'];
					$artist = track['artist']['#text'];
					$track = track['name'];
					$date = track['date']['#text']; // example: "23 Nov 2015, 20:39"
					$dateUTC = track['date']['uts']; // example: "1448311164"

					if ($prev_album == $album)
					{
						AddTrackToAlbum($album, $track);
					}
					else
					{
						GenerateNewAlbum($artist, $album, $image);
						$prev_album = $album;
					}
				});

			}
		});
//	});
});

function GenerateNewAlbum(artist_name, album_name, image_src)
{
	$('.charts').append(
	'<div class="album" data-album-title='+album_name+' style="width: 750px; height: 400px; margin: auto;" >' +
		'<div class="album-logo-tracks" style="height:300px; width:100%;">'+
			'<div class="album-logo" style="height:300px;  float: left;"> '+'<img src='+image_src+'/>'+'	</div>'+
			'<div class="album-track" style="height: 300px;  float: right; ">	</div> '+
		'</div>'+
		'<div class="artist-title"> '+album_name +' - ' + artist_name+' </div>'+
	'</div>');
};

function AddTrackToAlbum(album, track)
{
	$('.album:last').find('.album-track').append(
		'<div class="track" style="width:100%;">' + track + '</div>'
		);
};


