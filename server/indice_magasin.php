<?php
require_once 'config.php';

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);
    $oDatas = [];
    //If json_decode failed, the JSON is invalid.
    if (!is_array($decoded)) {
        die('Missed action');
    } else {
        if (!isset($decoded['magasin']) && !isset($decoded['day_num']) ) {
            die('Missed action');
        }

        if (!isset($decoded['day_num'])) { 
            $magasin = htmlentities($dvecoded['magasin']);
            $stmt = $pdo->prepare("
            SELECT indice.id, indice.letter
            FROM indice LEFT JOIN indice_magasin
            ON indice.id = indice_magasin.id
            WHERE indice_magasin.magasin_id = :magasin
            AND indice_magasin.indice_id != 0
            ORDER BY indice.id ASC");
            $stmt->execute(['magasin' => $magasin]);
            $aIndices = $stmt->fetchAll();
            $oDatas = !$aIndices ? [] : $aIndices;
        } else {
            $day_num = (int)$decoded['day_num'];
            $stmt = $pdo->prepare("
            SELECT *
            FROM indice_magasin
            WHERE indice_magasin.id = :jour");
            $stmt->execute(['jour' => $day_num]);
            $aIndices = $stmt->fetch();
            $oDatas = !$aIndices ? [] : $aIndices;
        }
    }
}

return  print json_encode($oDatas);
