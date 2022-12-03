<?php
$valid_extensions = array('geojson', 'pdf', 'png', 'PNG');
 
if(isset($_POST["name"])) {
	// Get the submitted form data 
	$file =  $_FILES['data']["name"];
	$tmp = $_FILES["data"]["tmp_name"];

	$path = "temp/";
	
	if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
	
	$allowedSize = 10000000;
	if(($_FILES["data"]["size"] > $allowedSize)){
		echo "filesize";
		exit();
	}
	// get uploaded file's extension
	$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
	// can upload same image using rand function
    
	$fianal_filename = strtolower(str_replace(" ", "_", uniqid(rand()).$file));//
	// check's valid format
	if(in_array($ext, $valid_extensions)) {
		//$imageF = strtolower(str_replace(" ", "-",$fianal_filename));
		$path = $path.strtolower($fianal_filename); 
		if(move_uploaded_file($tmp,$path)) {
		    echo $fianal_filename;
			exit();
		}
		else{
			//echo 'error' .print_r($_FILES);
			echo 'error';
			exit();
		}
	}
	else{
		echo 'wongfile';
		exit();
	}
}
?>