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
        if (!isset($decoded['day_num'])) {
            die('Missed action');
        }

        $day_num = $decoded['day_num'];
        $stmt = $pdo->prepare("SELECT id FROM question WHERE jour=:jour");
        $stmt->execute(['jour'=> $day_num]);
        $aQuestion = $stmt->fetch();
        
            $winning = (int)$decoded['winning'];
            $magasin = (int)$decoded['magasin'];
            $stmt = $pdo->prepare("INSERT INTO winners(`id`,`winning_id`,`magasin_id`) VALUES (:day_num, :winning, :magasin )");
            $stmt->execute(['day_num' => $day_num, 'winning' => $winning, 'magasin' => $magasin]);
            $aWinning = $stmt->fetch();
            $oDatas = !$aWinning ? [] :$aWinning;
      }
    }
    
    return  print json_encode($oDatas);
?>
