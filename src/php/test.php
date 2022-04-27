<?php 
    $name = $_POST['user_name'];
    $email = $_POST['user_email'];
    $message = $_POST['user_message'];

    echo "Скрипт сработал! <br>" . $name . "<br>" . $email . "<br>" . $message;
?>