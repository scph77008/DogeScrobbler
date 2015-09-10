<?
//check git
setcookie('login', $_SESSION['login']); 
setcookie('pass', $_SESSION['pass']);
setcookie('auth', $_SESSION['auth']);
$login = $_SESSION['login'];
$pass = $_SESSION['pass'];
?>
<!DOCTYPE html>
<html>
<head>
<?php session_start(); ?>
	<meta charset='utf8'>
	<title> Задачи </title>
	<script type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
	<center> 
	Проверка номера на валидность в международном формате 
	<form name="phone_form" method="POST">
		<input type="text" name="phone">
		<input type="submit" name="phone_check" value="Проверить">
	</form>

<?php
	if ($_POST['phone_check']) 
	{	
		if((preg_match("~((^[+]{0,1}[7]{1})|(^[8]{1}))[-_()\s]{0,1}[0-9]{3}[-_()\s]{0,1}[0-9]{3}[-_()\s]{0,1}[0-9]{2}[-_()\s]{0,1}[0-9]{2}$~", ltrim($_POST['phone']))) && (preg_match("~^[^a-zA-Zа-яА-Я]~", $_POST['phone'])))
			{
				echo "Подходит";
			}
			else 
			{
				echo "Не подходит";
			}
	}
?>

<hr>
Курс евро:

<?php
	$rbc = file_get_contents("http://rbc.ru");
	
	if(preg_match('~cash_item_2.*green.*([0-9]{2},[0-9]{2}).*([0-9]{2},[0-9]{2}).*cash_item_3~Usi', $rbc, $result))
	{
		echo "Растёт. Покупка: ". $result[1]. "; продажа: " . $result[2] . ".";
	}
	elseif(preg_match('~cash_item_2.*red.*([0-9]{2},[0-9]{2}).*([0-9]{2},[0-9]{2}).*cash_item_3~Usi', $rbc, $result))
	{
		echo "Падает. Покупка: ". $result[1]. "; продажа: " . $result[2] . ".";
	}
	
	
?>

<hr>
Новости:
<?php
	// preg_match_all('~js-main-reload-list.*(?<=<a href=")(http://.*\.rbc\.ru/.*/)(?="\s*)~Usi', $rbc, $news);
	// //print_r($news);

	// $newsarr = explode("000003", $news[0][0]);
	// $newsarr2 = explode("news-main-feed__item js-main-reload-item", $newsarr[0]);
	
	// foreach ($newsarr2 as $value) 
	// {
	// 	echo "<br>" . $value ;
	// }
	
?>
<!--  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -->
<!----  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -->
<!--  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -->
<hr>

Сессии: <font color='red'>Не работают, см. день 2</font>
<br>
<form method="POST" > 

<?php 
	if(empty($_SESSION['auth'])) 
	{ ?>
		<input type="text"	 	name="login"	placeholder="Логин">
		<input type="password"	name="pass" 	placeholder="Пароль">
		
		<input type="submit" name="act"	 	value="Войти">
		<input type="submit" name="act" 	value="Зарегистрироваться">
		<br>	
		Логин и пароль должны состоять из латинских символов и цифр
<? } 
	else
	{
		echo "Привет, пользователь " . $login;
	?>
		<input type="submit" name="act"	value="Выйти">
<?	} ?>

</form>

<?
	/*if(!empty($_POST))
	{
		if($_POST['act'] == 'Зарегистрироваться')
		{	
			$login = rtrim(ltrim($_POST['login']));
			$pass = $_POST['pass'];

			if ((!empty($login)) && (!empty($pass)))
			{
				$file = fopen('login.txt', 'r');
				while (!feof($file))
				{
					$string = fgets($file);
					$logpass = explode('%%%', $string);

					if ($login == $logpass[0]) 
					{	
						echo "<p class='alarm'>Такой логин уже занят</p>";
					}
				}

				if (!$err)
				{
					$_SESSION['login'] = $login;
					$_SESSION['pass'] = $pass;
					$_SESSION['auth'] = '1';
					
					$file = fopen('login.txt', 'a');
					$fwrite = fwrite($file, $login."%%%".$pass."%%%\r\n");
					fclose($file);
					?>			
						<script type="text/javascript"> document.location.href = '/index.php'; </script> 
					<?
				}
				else			
				{
					echo $err;
				}
			}
			else
			{
				echo "<p class='alarm'>Ничего не введено</p>";
			}
		}



		if ($_POST['act'] == 'Войти')
		{
			$file = fopen('login.txt', 'r');
			while (!feof($file))
			{
				$string = fgets($file);
				$logpass = explode('%%%', $string);
				if (($login == $logpass[0]) && ($pass == $logpass[1])) 
				{ 
					$_SESSION['login'] = $login;
					$_SESSION['pass'] = $pass;
					$_SESSION['auth'] = '1';
				?>	
					<script type="text/javascript"> document.location.href = '/index.php'; </script> 
				<?
				}
				else
				{
					$err = "<p class='alarm'>Неправильный логин или пароль</p>";
				}
			}
			fclose($file);

			if ($err)
			{
				echo $err;
			}
		}

		if($_POST['act'] == 'Выйти')
		{
			session_destroy();	
			?> 
				<script type="text/javascript"> document.location.href = '/index.php'; </script> 
			<?
		}
	}	
	echo "<a href='index2.php'> Вторая страница </a>";*/
?>

</center>
</body>
</html>