<?php
    require_once 'config.php';
    
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
      $aGameId = [];
      //If json_decode failed, the JSON is invalid.
      if(! is_array($decoded)) {
            die('Missed action');
      } else {
        if (!isset($decoded['date_time'])) {
            die('Missed action');
        }
        
        $date_time = str_replace('/', '-', $decoded['date_time']);
        
        $stmt = $pdo->prepare("SELECT id FROM date_game WHERE date_time =SUBSTRING(NOW(), 1,10);");
        $stmt->execute();
        $aGameId = $stmt->fetch();
      }
    }
    
    return  print json_encode($aGameId);
?>
