<?php
    require_once 'config.php';
    
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
    
      //If json_decode failed, the JSON is invalid.
      if(! is_array($decoded)) {
            die('Missed action');
      } else {
        if (!isset($decoded['magasin'])) {
            die('Missed action');
        }
        if (!isset($decoded['code'])) {
            die('Missed action');
        }
        if (!isset($decoded['enseigne'])) {
          die('Missed action');
        }

        $magasin = $decoded['magasin'];
        $enseigne = $decoded['enseigne'];
        $code = $decoded['code'];
        $stmt = $pdo->prepare("SELECT * FROM magasin
        WHERE enseigne=:enseigne AND `password`=:code AND `magasin`=:magasin");
        $stmt->execute(['enseigne' => $enseigne, 'code'=> $code, 'magasin'=> $magasin]);
        $login = $stmt->fetch();
      }
    }

    return  print json_encode([$login]);
?>