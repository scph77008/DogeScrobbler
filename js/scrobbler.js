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
				$.each((data.recenttracks.track), function(id, track)
				{

					$image = track['image'][3]['#text']; // extralarge, 300x300px
					$album = track['album']['#text'];
					$artist = track['artist']['#text'];
					$track = track['name'];
					$date = track['date']['#text']; // example: "23 Nov 2015, 20:39"
					$dateUTC = track['date']['uts']; // example: "1448311164"

					if ($prev_album != $album)
					{
						generateNewAlbum($artist, $album, $image);
						$prev_album = $album;
					}
					addTrackToAlbum($album, $track);

				});

				resizeAlbums();
			}
		});
//	});

});


function generateNewAlbum(artist_name, album_name, image_src)
{
	$('.charts').append(
	'<div class="album flow-text z-depth-2 col s6 center row" data-album-title='+album_name+'>' +
		'<div class="album-logo-tracks s12 row">'+
			'<div class="album-logo col s5" style="height:300px;  float: left;"> '+'<img class="circle responsive-img" src='+image_src+'/>'+'	</div>'+
			'<div class="album-track col s7" style="height: 300px;  float: right; text-align: left;	padding-top: 0.5rem;"></div> '+
		'</div>'+
		'<div class="artist-title row s12">'+album_name +' - ' + artist_name+'</div>'+
	'</div><br>');
};

function addTrackToAlbum(album, track)
{
	$('.album:last').find('.album-track').append(
		'<div class="col s7 track flow-text" style="width:100%;">' + track + '</div>'
		);
};

function resizeAlbums()
{
	$('.album').each(function ()
	{
		var $heigth_sum = 0;
		$(this).children('.album-logo-tracks').children('.album-track').children('.track').each(function ()
		{
			$heigth_sum += parseInt($(this).css('height'));
		});

		$(this).css({'height': $heigth_sum+120}, {'min-height': '400px'});
		$(this).children('.album-logo-tracks').css({'height': $heigth_sum}, {'min-height': '400px'});
	});

}
