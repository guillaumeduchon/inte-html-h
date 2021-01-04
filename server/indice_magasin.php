<?php
    require_once 'config.php';
    
    $stmt = $pdo->prepare("SELECT * FROM users LIMIT :limit, :offset");
    $stmt->execute(['limit' => $limit, 'offset' => $offset]); 
    $data = $stmt->fetchAll();

    return  print json_encode($data);

?>
