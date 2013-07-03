<?php

	$HOST = "localhost";
	$USERNAME = "root";
	$PWORD = "MD#3311md";
	$DB = "peter-dickinson";
	// Create connection
	$con = mysqli_connect($HOST,$USERNAME,$PWORD,$DB);

	// Check connection
	if (mysqli_connect_errno($con)) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	if (isset($_POST['name']) && isset($_POST['message'])) {

		$name = $_POST['name'];
		$message = $_POST['message'];


		if (!mysqli_query($con, "INSERT INTO messages (name, message)
		VALUES ('$name', '$message')")) {
			echo "Unable to perform insertion query.";
		}
	}

	if (!$result = mysqli_query($con,"SELECT * FROM messages")) {
		echo "Unable to perform retrieval query.";
	}

	$i = 0;

	while($row = mysqli_fetch_array($result)) {
	   $array[$i][name] = $row['name'];
	   $array[$i][message] = $row['message'];
	   $i++;
	}

	$json_array = json_encode($array);
	echo $json_array;

	mysqli_close($con);

?>