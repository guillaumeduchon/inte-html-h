<?php
    require_once 'config.php';
    $question = []; $reponse = [];
    $date = date('d/m/Y');
    $date_tab = ['04/01/2021'=>'1', '05/01/2021'=>'2', '06/01/2021'=>'2'];

    $jour = $date_tab[$date];

    $stmt = $pdo->prepare("SELECT * FROM question
    WHERE jour=:jour");
    $stmt->execute(['jour' => $jour]);
    $question = $stmt->fetch();
    if($question) {
        $stmt = $pdo->prepare("SELECT * FROM reponse
        WHERE question_id=:question_id");
        $stmt->execute(['question_id' => $question['id']]);
        $reponse = $stmt->fetch();
    }

    return  print json_encode([$question, $reponse]);
?>