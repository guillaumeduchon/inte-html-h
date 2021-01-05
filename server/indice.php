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
        if (!isset($decoded['num_day'])) {
            die('Missed action');
        }

        $num_day = $decoded['num_day'];
        $stmt = $pdo->prepare("SELECT id FROM question WHERE jour=:jour");
        $stmt->execute(['jour'=> $num_day]);
        $aQuestion = $stmt->fetch();

        $stmt = $pdo->prepare("SELECT * FROM indice
        WHERE question_id=:id");
        $stmt->execute(['id' => $aQuestion['id']]);
        $aIndice = $stmt->fetch();
      }
    }
    return  print json_encode($aIndice);

?>
