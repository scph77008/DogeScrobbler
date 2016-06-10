<?php
date_default_timezone_set('UTC');
?>
<!DOCTYPE html>
<html>
<head>
	<title> DogeScrobbler </title>
	<link rel="stylesheet" type="text/css" href="css/style.css">

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,900italic' rel='stylesheet' type='text/css'>
	<script src="/js/scrobbler.js"></script>
</head>
<body style="background: url(doge.jpg)">

<form method="POST">
	<div id="header">

		<div class="input_text">
			<label for="date" class='title'> Выберите дату: </label>
		</div>

		<div class="input_text">
			<input class='input_input' type='date' name='date' id="date">
		</div>

		<br>

		<div class="input_text">
			<label for="count" class='title'> Количество треков (1-200): </label>
		</div>

		<div class="input_text">
			<input class='input_input' type="text" name='count' id='count' value="200">
		</div>

		<br>

		<div class="input_text">
			<label for="user" class='title'> Пользователь: </label>
		</div>

		<div class="input_text">
			<input class='input_input' type="text" name='user' id='user' value="iHappiness">
			<br>
			<input class='input_input' type="submit" id='submit' name='submit' style="margin-top: 3px">
		</div>
	</div>
</form>


</body>
</html>