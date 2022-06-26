<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user-name'];
$phone = $_POST['user-phone'];
//$mail->SMTPDebug = 3;                               // Enable verbose debug output


$mail->setFrom('info@sochi-cabriolet.ru'); // от кого будет уходить письмо?
$mail->addAddress('info@sochi-cabriolet.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Обратная связь';
$mail->Body    = '' .$name . ' хочет связаться с вами насчет бронирования!'."<br>" . "Номер телефона:" . $phone ;
$mail->AltBody = '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}
?>