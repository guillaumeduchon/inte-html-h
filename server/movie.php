<?php
    require_once 'config.php';
    
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
      $aResponse = [];
      //If json_decode failed, the JSON is invalid.
      if(! is_array($decoded)) {
            die('Missed action');
      } else {
        if (!isset($decoded['magasin_num']) && !isset($decoded['date_time']) ) {
            die('Missed action');
        }
        if (isset($decoded['date_time'])){
          $stmt = $pdo->prepare("SELECT id FROM date_game WHERE date_time =SUBSTRING(NOW(), 1,10);");
          $stmt->execute();
          $aResponse = $stmt->fetch();
        } else { 
          $magasin_num = (int)$decoded['magasin_num'];
          $stmt = $pdo->prepare("UPDATE magasin
          SET has_read_video=1 WHERE id=:id");
          $stmt->execute(['id' => $magasin_num]);
          $aResponse = $stmt->fetch();
        }
      }
    }
    
    return  print json_encode($aResponse);
?>
