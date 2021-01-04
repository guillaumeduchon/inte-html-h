<?php
    require_once 'config.php';
    
    $stmt = $pdo->query("SELECT * FROM magasin");
    $user = $stmt->fetch();

    return  print json_encode($user);

?>