<?php
    require_once 'config.php';

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
      $oDatas = [];
      //If json_decode failed, the JSON is invalid.
      if (!isset($decoded['magasin'])) {
            $stmt = $pdo->query("SELECT * FROM magasin");
            $magasins = $stmt->fetchAll();
            $oDatas = !$magasins ? [] :$magasins;
        } else {
            $stmt = $pdo->prepare("SELECT * FROM magasin WHERE id=:id");
            $stmt->execute(['id' => $decoded['magasin']]);
            $aMagasin = $stmt->fetch();
            $oDatas = !$aMagasin ? [] :$aMagasin;
        }
        
    }
    
    return  print json_encode($oDatas);
?>