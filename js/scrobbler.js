$(document).ready(function ($)
{
	const API_KEY = '2417947c57e2d0cde512441710dcb29f';
	$('#submit').on('click', function ()
	{
		//alert('wow!');

		var $user      = $('#user');
		var $limit     = $('#limit');
		var $date_from = $('#date');

		var $user_val      = $user.val();
		var $limit_val     = $limit.val();
		var $date_from_val = $date_from.val();
		var $date_to_val = parseInt($date_from_val + 60 * 60 * 24);  //TODO: int

		var $url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + $user_val +
			'&limit=' + $limit_val +
			'&from=' + $date_from_val +
			'&to=' + $date_to_val +
			'&api_key=2417947c57e2d0cde512441710dcb29f' +
			'&format=json';

		alert($date_from_val);
		alert($date_to_val);
		$.ajax({
			url    : $url,
			success: function (data)
			{
				console.log(data);
			}
		});

	});
});
