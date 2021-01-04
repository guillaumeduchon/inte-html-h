<?php
    require_once 'config.php';
    
    $stmt = $pdo->query("SELECT * FROM question");
    $user = $stmt->fetch();

    return  print json_encode($user);

?>