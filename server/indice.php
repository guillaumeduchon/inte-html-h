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
        
        if($aQuestion) {
          //GET
          if (!isset($decoded['indice']) && !isset($decoded['magasin'])) {
            $stmt = $pdo->prepare("SELECT * FROM indice
            WHERE question_id=:id");
            $stmt->execute(['id' => $aQuestion['id']]);
            $aIndice = $stmt->fetch();
            $oDatas = !$aIndice ? [] :$aIndice;
          }
          //SET
          else{
            $indice = (int)$decoded['indice'];
            $magasin = (int)$decoded['magasin'];
            $magasin_name = $decoded['magasin_name'];
            $stmt = $pdo->prepare("SELECT num FROM magasin
            WHERE id=:id");
            $stmt->execute(['id' => $magasin]);
            $magasin_num = $stmt->fetch();
            $stmt = $pdo->prepare("INSERT INTO indice_magasin(`id`,`indice_id`,`magasin_id`, `hour_participate`, `magasin_name`, `magasin_num`) VALUES (:day_num, :indice, :magasin, NOW(), :magasin_name, :magasin_num )");
            $stmt->execute(['day_num' => $day_num, 'indice' => $indice, 'magasin' => $magasin, 'magasin_name' => $magasin_name, 'magasin_num' => $magasin_num['num']]);
            $aIndice = $stmt->fetch();
            $oDatas = !$aIndice ? [] :$aIndice;
          }
        }
      }
    }
    
    return  print json_encode($oDatas);
?>
