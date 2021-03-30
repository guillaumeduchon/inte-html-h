<?php
    $datetime =  date_timezone_set(new DateTime(), new DateTimeZone('Europe/Paris'));
    return  print json_encode($datetime->format('Y-m-d\TH:i:sO'));
?>