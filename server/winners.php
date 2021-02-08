<?php
    require_once 'config.php';
    
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
      $oDatas = [];
      //If json_decode failed, the JSON is invalid.
      if(! is_array($decoded)) {
            die('Missed action');
      } else {
        if (!isset($decoded['magasin'])) {
            die('Missed action');
        }

        $magasin = $decoded['magasin'];
        $stmt = $pdo->prepare("INSERT INTO winners (id, num, `name`, region) SELECT `id`, num, `name`, region
        FROM magasin
        WHERE magasin.id = :magasin");
        $stmt->execute(['magasin'=> $magasin]);
        $aWinning = $stmt->fetchAll();
        $oDatas = !$aWinning ? [] :$aWinning;
      }
    }
    
    return  print json_encode($oDatas);
?>
