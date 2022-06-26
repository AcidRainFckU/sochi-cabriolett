<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$dNumber = $_POST['day_numb'];
$name = $_POST['reserv-user-name'];
$phone = $_POST['reserv-user-phone'];
$start = $_POST['reserv-start-date'];
$end = $_POST['reserv-end-date'];
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

$mail->Subject = 'Бронь';
$mail->Body    = '' .$name . ' оставил заявку на бронирование!'."<br>" . "Номер телефона:" . $phone .'<br>'. 'Количество дней:'. $dNumber .'<br>'. 'Начало аренды' . $start . '<br>'.'Окончание аренды'. $end;
$mail->AltBody = '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}
?>