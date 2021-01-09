<?php
require_once 'config.php';

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    $aReponse = [];
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    //If json_decode failed, the JSON is invalid.
    if (!is_array($decoded)) {
        die('Missed action');
    } else {
        if (!isset($decoded['day_num'])) {
            die('Missed action');
        }

        $day_num = (int)$decoded['day_num'];
        $stmt = $pdo->prepare("SELECT id FROM question WHERE jour=:jour");
        $stmt->execute(['jour' => $day_num]);
        $aQuestion = $stmt->fetch();

        if ($aQuestion) {
            if (!isset($decoded['valid'])) {
                $stmt = $pdo->prepare(
                    "SELECT reponse.*,
                    media_reponse.id as reponse_id,
                    media_reponse.name as reponse_name,
                    media_reponse.url as reponse_url
                    FROM reponse LEFT JOIN media_reponse
                    ON reponse.id = media_reponse.reponse_id
                    WHERE reponse.question_id =:id"
                );
            } else {
                if($decoded['valid'] === 'true') {
                    $stmt = $pdo->prepare("SELECT * FROM reponse
                     WHERE question_id=:id AND is_valid=1");
                } else {
                    $stmt = $pdo->prepare("SELECT * FROM reponse
                    WHERE question_id=:id AND is_valid=0");
                }
            }

            $stmt->execute(['id' => $aQuestion['id']]);
            $aReponse = $stmt->fetchAll();
        }
    }
}
return  print json_encode($aReponse);
