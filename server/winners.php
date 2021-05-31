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
        
        // if (isset($decoded['user_answer_final'])) {
        //   $user_answer_final = $decoded['user_answer_final'];
        //   $stmt = $pdo->prepare("INSERT INTO loosers (magasin, word, datehour) VALUES (:magasin, :user_answer_final, NOW())");
        //   $stmt->execute(['magasin'=> $magasin, 'user_answer_final' => $user_answer_final]);
        //   $aLoosing = $stmt->fetch();
        //   $oDatas = !$aLoosing ? [] :$aLoosing;
        // } else {
          $stmt = $pdo->prepare("INSERT INTO winners (id, num, `name`, region, datehour) SELECT `id`, num, `name`, region, NOW()
          FROM magasin
          WHERE magasin.id = :magasin");
          $stmt->execute(['magasin'=> $magasin]);
          $aWinning = $stmt->fetchAll();
          $oDatas = !$aWinning ? [] :$aWinning;
        // }
      }
    }
    
    return  print json_encode($oDatas);
?>
