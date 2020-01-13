<?php

function Mysql($sql,$logtag = 'None'){
	
	global $conn;
	
	$result = mysqli_query($conn,$sql);
	
	if (!$result) {
		echo "[Error][Mysql($logtag,$sql)]-->>" . mysqli_error($conn) . '<<-- <br>';
		
	}
	
	$split_string= explode(" ",$sql);
	
	$command = strtolower($split_string[0]);
	
	$count = null;
	$row = null;
	
	if ( in_array( $command , ['select','show','describe','explain'] ) ) {
		//echo '<br>' . print_r($result) . '<br>';
		$row = mysqli_fetch_assoc($result);
		//echo '<br>'. $sql . $r . '<br>';
		$count = mysqli_num_rows($result);
	}
	
	return [$count,$row];
}

function response(...$args) {
	//echo '+++';print_r($args); echo '+++';
	$arange = count($args) >2 ? range(0,count($args)-1,2) : [0];
	//echo '---',count($args),print_r($arange),'----';
	$barray = [];
	foreach($arange as $i) {
		//echo $i,$args[$i];
		$j = $args[$i];
		$j_1 = $args[$i+1];
		$barray[$j] = $j_1;
	}
	
	//print_r($barray);
	return json_encode($barray);
}
function Login($user,$pass) {
	
	global $conn;
	
	$sql = "select user,password from memousers where user = '$user'";
	
	list($count,$row) = Mysql($sql,'Login');
	
	if ($count) {
		if ( password_verify($pass, $row['password']) ) {
			
			Bad_start_session($user,$pass);
			echo response('loginComplete',true);
			
		}
	
	}
	

}
//ALTER TABLE `test` AUTO_INCREMENT=1
function Register($user,$pass) {
	
	global $conn ;
	
	
	$sql1 = "select user from memousers where user = '$user'";
	
	list ($count,$r) = Mysql($sql1,'Register1');

	
	if ($count) {
		echo response('exists',true);
	}
	else {
		
		$pass = password_hash($pass,PASSWORD_DEFAULT );
		$sql = "insert into memousers (user,password) values ('$user','$pass')";
		
		Mysql($sql,'Register2');
		
		Bad_start_session($user,$pass);
		ECHO response('registrationComplete',true);
		
	}
	
	
}

function Store($var1,$var2) {
	session_start();
	if (isset($_SESSION['Username']) &&  isset($_SESSION['Password']) ) {
		$user = $_SESSION['Username'] ;
		$pass = $_SESSION['Password'] ;
		$sql = "insert into memousers (user,password,content) values ('$user','$pass','$var1')";
		Mysql($sql,'Store');
		echo 'Data Stored into Database';
	}
	else 
		echo 'nooo';
	
}

function Get($var1,$var2) {
	session_start();
	if (isset($_SESSION['Username']) &&  isset($_SESSION['Password']) ) {
		$user = $_SESSION['Username'] ;
		$pass = $_SESSION['Password'] ;
		$sql = "select content from memousers  where user='$user' order by id desc limit 1";
		list($count,$row) = Mysql($sql) ;
		echo 'Retrieving [Content] Data From DB'; print_r($row) ; 
	}
}
function Bad_start_session($user,$pass) {
	
	session_start();
	
	$_SESSION['Username'] = $user ;
	$_SESSION['Password'] = $pass ;
}

function ISsession($var1, $var2) {
	session_start() ;
	echo response('debug' ,[session_status()== PHP_SESSION_ACTIVE,session_name()], 'newname' , $_SESSION['Username']  ) ;
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "test";


$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
	echo 'Not Connected';
    die("Connection failed: " . mysqli_connect_error());
	
} else {
	$data =  $_POST ;

	echo "Connected successfully\n";
	//print_r($_POST);
	$Username = $data['Var1'] ;
	$Password = $data['Var2'] ;
	$Action = $data['Action'] ;
	
	call_user_func($Action,$Username,$Password);
	mysqli_close($conn);
}
 ?>
