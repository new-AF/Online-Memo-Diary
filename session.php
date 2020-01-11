
<?php

function Mysql($Sql_statement) {
	
	echo '----->>',($Sql_statement);
	global $conn;
	//var_dump ($conn);
	
	
	$Result = mysqli_query($conn,$Sql_statement);
	
	if (!$Result) {
		echo 'Error querying',mysqli_error($conn),'<br>';
		return;
	}
	
	$Rows = mysqli_fetch_array($Result,MYSQLI_ASSOC);
	$Count = mysqli_num_rows($Result);
	
	
	return [$Count,$Rows];
}

function register($user,$pass) {
	$sql = "insert into memousers (user,password) values ('$user','$pass')";
	Mysql($sql);
	
}
function login($user,$pass) {
	
	
}

function decide($data) {
	global $conn;
	$Username = $data['Username'];
	$Password = $data['Password'];
	
	$Sql_statement = "select user,password from memousers limit 1 ";
	
	$r = Mysql($Sql_statement);
	$count = $r[0];
	$result = $r[1];
	
	//print_r($result);
	if (count == 0)
		register($Username,$Password);
	else
		login($Username,$Password);
	
	
	
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

	decide($data);
	
	mysqli_close($conn);
}
 ?>
