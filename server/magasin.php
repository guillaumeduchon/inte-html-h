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
            $stmt = $pdo->query("SELECT DISTINCT enseigne FROM magasin ORDER BY magasin.name ASC");
            $aEnseigne = $stmt->fetchAll();
            $oDatas = !$aEnseigne ? [] : $aEnseigne;
        } else {
            if (isset($decoded['final_winners'])) {
                $finalQuestionID = 10;
                $stmt = $pdo->prepare("SELECT magasin.*
                FROM magasin
                LEFT JOIN indice_magasin 
                ON indice_magasin.magasin_id = magasin.id
                WHERE indice_magasin.indice_id =:magasin_id AND question_id =:question_id
                GROUP BY magasin.id");
                $stmt->execute(['magasin_id' => $decoded['magasin'], 'question_id' => $finalQuestionID]);
                $aMagasin = $stmt->fetch();
                $oDatas = !$aMagasin ? [] : $aMagasin;
            } else if (isset($decoded['active'])) {
                $stmt = $pdo->prepare("SELECT magasin.*, reponse.id as 'done_last_game'
                FROM magasin 
                LEFT JOIN reponse 
                ON reponse.magasin_id = magasin.id
                WHERE magasin.id=:id
                ORDER BY 'done_last_game' DESC");
                $stmt->execute(['id' => $decoded['magasin']]);
                $aMagasin = $stmt->fetchAll();
                $oDatas = !$aMagasin ? [] : $aMagasin;
            } else if (isset($decoded['enseigne'])) {
                $enseigne = $decoded['enseigne'];
                $stmt = $pdo->prepare("SELECT DISTINCT region  FROM magasin WHERE enseigne='{$enseigne}'");
                $stmt->execute();
                $aRegion = $stmt->fetchAll();
                $oDatas = $aRegion;
            } else {
                $stmt = $pdo->prepare("SELECT DISTINCT * FROM magasin WHERE id=:id");
                $stmt->execute(['id' => $decoded['magasin']]);
                $aMagasin = $stmt->fetch();
                $oDatas = !$aMagasin ? [] :$aMagasin;
            }
        }
    }

    return  print json_encode($oDatas);
} catch (Throwable $x) {
    var_dump($x);
}
