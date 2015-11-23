<?php
define('API_KEY', '2417947c57e2d0cde512441710dcb29f');
if ($_POST['submit'])
{
	$date_from = strtotime($_POST['date']);
	$date_to   = $date_from + 60 * 60 * 24;

	$message = "<h3 align='center'> За " . date("d/m/Y", $date_from) . "</h3>";

	$request = file_get_contents(
		'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' . $_POST['user'] . '&limit=' . $_POST['count'] . '&from=' . $date_from . '&to=' . $date_to . '&api_key=' . API_KEY . '&format=json'
	);

	$xml = new SimpleXMLElement($request);
	$charts_screen = '';
	$charts = '';
	$prev_artist = '';
	$prev_album = '';
	$first_art = 0;

	foreach ($xml->recenttracks->track as $track)
	{
		$time = strtotime($track->date) + 3 * 60 * 60;
		//Artist	Album	Title(name)	Track	Length	"L"	Unix-time
		$charts .= $track->artist . "\t" . $track->album . "\t" . $track->name . "\t" . "1" . "\t" . "300" . "\t" . "L" . "\t" . $time . "\r\n";

		// $charts_screen .= $track->artist . "\t" . $track->album . "\t" . $track->name . " " . date("d/m/Y H:i:s", strtotime($track->date)+60*60*3) . ")<br>";
		?>

		<div class='charts'>
			<div class="album_logo">
				<img src='<?= $track->image ?>'>
			</div>

			<div class="artist">
				&nbsp;<?= $track->artist ?> —
			</div>

			<div class="track">
				&nbsp;<?= $track->name ?>&nbsp;(
			</div>

			<div class="album">
				<?= $track->album ?>)
			</div>

			<div class="date">
				&nbsp;<?= date("H:i", $time) ?>
			</div>
		</div>

		<?
	}

	?>
	<div class="charts">
		<?//echo $charts_screen;
		?>
	</div>

	<?
	/*$file = fopen('C:/Users/scph77008/Desktop/' . date("d-m-Y", $date_from) . '.scrobbler.log', 'w');
	fwrite($file, $charts);
	fclose($file);*/

	?>
	<script type="text/javascript"> alert("Работает!") </script>
	<?
}

?>	