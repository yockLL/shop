<?php
	$config = array(
		"host" => "localhost:3306",
		"username" => "root",
		"password" => "",
		"dbname" => "1902"
	);
	//跟数据库建立连接
	mysql_connect($config["host"], $config["username"], $config["password"]);
	//选择数据库
	mysql_select_db($config["dbname"]);
	
	//设置编码
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
?>