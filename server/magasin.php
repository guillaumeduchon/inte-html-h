<?php
    require_once 'config.php';
    
    $stmt = $pdo->query("SELECT * FROM magasin");
    $magasins = $stmt->fetchAll();
    return  print json_encode($magasins);
?>