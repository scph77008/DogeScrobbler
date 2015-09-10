<!DOCTYPE html>
<html>
<head>
	<meta charset='utf8'>
	<title> Новости </title>
</head>
<body>
<?php
	$rbc = file_get_contents("http://rbc.ru");
	preg_match_all('~js-main-reload-list.*(?<=<a href=")(http://.*\.rbc\.ru/.*/)(?="\s*)~Usi', $rbc, $news);
	//print_r($news);

	$newsarr = explode("000003", $news[0][0]);
	$newsarr2 = explode("news-main-feed__item js-main-reload-item", $newsarr[0]);
	
	foreach ($newsarr2 as $value) 
	{
		echo "<br>" . $value ;
	}
?>
</body>
</html>