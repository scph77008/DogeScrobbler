<!DOCTYPE html>
<html>
<head>
	<title> DogeScrobbler </title>
	<link rel="stylesheet" type="text/css" href="style.css">

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,900italic' rel='stylesheet' type='text/css'>

</head>
<body style="background: url(doge.jpg)">
	
<?php
	date_default_timezone_set('UTC');
?>

<form method="POST">
	<div id="header">
			
		<div class="input_text" >
			<font class = 'title' > Выберите дату: </font>
		</div>

		<div class="input_text"> 
			<input class='input_input' type='date' name='cal'> 
		</div>
		
		<br>

		<div class="input_text" >
			<font class = 'title' > Количество треков (1-200): </font>
		</div>

		<div class="input_text"> 
			<input class='input_input' type="text" name='count' value="200">
		</div>
	
		<br>

		<div class="input_text" > 
			<font class = 'title' > Пользователь: </font>
		</div>

		<div class="input_text"> 
			<input class='input_input' type="text" name='user' value="iHappiness"> <br>
			<input class='input_input' type="submit" id='but' name='submit' style="margin-top: 3px"> 
		</div>
	</div>
</form>	

<?php
	if ($_POST['submit']) 
	{

	$date_from = strtotime($_POST['cal']);
	$date_to = $date_from+60*60*24;
		
	echo "<h3 align='center'> 
		За " . date("d/m/Y", $date_from) . "</h3>";
	$request = file_get_contents('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' . $_POST['user'] . '&limit=' . $_POST['count'] . '&from=' . $date_from . '&to=' . $date_to . '&api_key=2417947c57e2d0cde512441710dcb29f');

	$xml = new SimpleXMLElement($request);
	$charts_screen = '';
	$charts = '';
	$prev_artist = '';
	$prev_album = '';
	$first_art = 0;

	foreach ($xml->recenttracks->track as $track)
		{
		$time  = strtotime($track->date)+3*60*60;
		//Artist	Album	Title(name)	Track	Length	"L"	Unix-time
		  $charts .= $track->artist . "\t" . $track->album . "\t" . $track->name . "\t" . "1" . "\t" . "300" . "\t" . "L"  . "\t" . $time . "\r\n";

		  // $charts_screen .= $track->artist . "\t" . $track->album . "\t" . $track->name . " " . date("d/m/Y H:i:s", strtotime($track->date)+60*60*3) . ")<br>";
		?>
		
		<div class='charts'>
			<div class="album_logo" > 
			<img src='<?=$track->image?>'>
			</div>

			<div class="artist" >
				&nbsp;<?=$track->artist?> —
			</div>

			<div class="track" > 
				&nbsp;<?=$track->name?>&nbsp;(
			</div>

			<div class="album" >  
					<?=$track->album?>)
			</div>

			<div class="date" > 
				&nbsp;<?=date("H:i", $time)?>
			</div>
		</div>

		<?
		}

 	?>
 	<div class="charts">
		<?//echo $charts_screen;?>
	</div>
	
	<?	$file = fopen('C:/Users/scph77008/Desktop/'.date("d-m-Y", $date_from).'.scrobbler.log', 'w');
	fwrite($file, $charts);
	fclose($file);
	
	?>
		<script type="text/javascript"> alert ("Работает!") </script>
	<?
}

?>	

</body>
</html>