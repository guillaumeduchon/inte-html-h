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
        if (!isset($decoded['day_num']) || !isset($decoded['response']) || !isset($decoded['magasin_num']) ) {
            die('Missed action');
        }

        $day_num = $decoded['day_num'];
        $response = $decoded['response'];
        $magasin_num = $decoded['magasin_num'];
        // $response = htmlspecialchars($decoded['response'], ENT_QUOTES);
        // $magasin_num = htmlspecialchars($decoded['magasin_num'], ENT_QUOTES);

        $stmt = $pdo->prepare("SELECT id FROM magasin WHERE num=:magasin_num");
        $stmt->execute(['magasin_num'=> $magasin_num]);
        $aId = $stmt->fetch();
        
        if( $day_num === '2') { /*TREAT RESPONSE HERE */ }
        if( $day_num === '4') { /*TREAT RESPONSE HERE */ }

        if($aId) {
          $stmt = $pdo->prepare("INSERT INTO reponse(`question_id`, `magasin_id`, `datehour`, `content`) VALUES (:day_num, :magasin_id,  NOW(), :response  )");
          $stmt->execute(['day_num' => $day_num, 'magasin_id' => $aId['id'], 'response' => $response]);
          $aIndice = $stmt->fetch();
          $oDatas = !$aIndice ? [] :$aIndice;
        }
      }
    }
    
    return  print json_encode($oDatas);
?>
