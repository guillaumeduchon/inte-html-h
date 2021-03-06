<?php
try {
    require_once 'config.php';

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
    
      $decoded = json_decode($content, true);
      $oDatas = [];
      //If json_decode failed, the JSON is invalid.
      if (!isset($decoded['magasin'])) {
            $stmt = $pdo->query("SELECT * FROM magasin ORDER BY magasin.name ASC");
            $magasins = $stmt->fetchAll();
            $oDatas = !$magasins ? [] :$magasins;
        } else {
            if (isset($decoded['final_winners'])) {
                $finalQuestionID = 10;
                $stmt = $pdo->prepare("SELECT magasin.*
                FROM magasin
                LEFT JOIN indice_magasin 
                ON indice_magasin.magasin_id = magasin.id
                WHERE indice_magasin.indice_id =:magasin_id AND question_id =:question_id
                GROUP BY magasin.id");
                $stmt->execute(['magasin_id' => $decoded['magasin'] , 'question_id' => $finalQuestionID]);
                $aMagasin = $stmt->fetch();
                $oDatas = !$aMagasin ? [] :$aMagasin;
            } else if(isset($decoded['active'])) {
                $stmt = $pdo->prepare("SELECT magasin.*, indice_magasin.id as 'done_last_game'
                FROM magasin 
                LEFT JOIN indice_magasin 
                ON indice_magasin.magasin_id = magasin.id
                WHERE magasin.id=:id 
                ORDER BY 'done_last_game' DESC");
                $stmt->execute(['id' => $decoded['magasin']]);
                $aMagasin = $stmt->fetchAll();
                $oDatas = !$aMagasin ? [] :$aMagasin;
            } else {
                $stmt = $pdo->prepare("SELECT * FROM magasin WHERE id=:id");
                $stmt->execute(['id' => $decoded['magasin']]);
                $aMagasin = $stmt->fetch();
                $oDatas = !$aMagasin ? [] :$aMagasin;
            }
        }
        
    }
    
    return  print json_encode($oDatas);
} catch (Exception $x) {
    var_dump($x);
}