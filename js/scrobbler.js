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
				var $album_image;
				var $album_title;
				var $track_artist;
				var $track_title;
				var $date;
				var $dateUTC;
				var $charts = $('.charts');
				console.log(data.recenttracks);
				$.each((data.recenttracks.track), function(id, track )
				{
					$album_image = track.image[2]['#text']; // large, 174x174px
					$album_title = track.album['#text'];
					$track_artist = track.artist['#text'];
					$track_title = track.name;
					$date = track.date['#text']; // example: "23 Nov 2015, 20:39"
					$dateUTC = track.date.uts; // example: "1448311164"

					$charts.append(
						'<div class="track">' +
							'<div class="album_logo"><img src=' + $album_image + '/></div>' +
							'<div class="artist">' + $track_artist + '</div>' +
							'<div class="track">' + $track_title + '</div>' +
							'<div class="album">' + $album_title + '</div>' +
							'<div class="date">' + $date + '</div>' +
						'</div>');

				});

			}
		});
//	});
});
