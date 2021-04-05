<?php
$name=$_POST['name'];
$phone=$_POST['phone'];

$to = "rahul.thakur@himanshusofttech.com";
$subject = "My subject";
$txt = "Hello admin! query is send by the user and user details are : name : ".$name." phone : ".$phone." ";
$headers = "From: webmaster@example.com";

echo mail($to,$subject,$txt,$headers);


?>