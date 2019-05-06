<?php
	include("./config.php");
	
	$username = $_POST["username"];
	$password = $_POST["password"];
	
	$sql = "insert into user (username,password) values ('$username','$password')";
	
	$sql1 = "select * from user where username = '$username'";
	
	$res1 = mysql_query($sql1);
	
	$row = mysql_num_rows($res1);
	
	if($row > 0){
		echo json_encode(array (
			"res_code1" => 0,
			"res_message1" => "用户名已存在，请重试"
		));
	}else{$res = mysql_query($sql);
			if($res) {
				echo json_encode(array (
				"res_code" => 1,
				"res_message" => "注册成功"
				));
			}else{
				echo json_encode(array (
				"res_code" => 0,
				"res_message" => "网络错误，注册失败。请重试"
			));
		};	
	}
?>