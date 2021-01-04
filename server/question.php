<?php
    require_once 'config.php';
    $date = date('d/m/Y');
    $date_tab = ['04/01/2021'=>'1', '05/01/2021'=>'2', '06/01/2021'=>'2'];
    $stmt = $pdo->query("SELECT * FROM question WHERE jour=".$date_tab[$date]."");
    $question = $stmt->fetch();

    $stmt = $pdo->query("SELECT * FROM reponse WHERE question_id=".$question[0]->id."");
    $reponse = $stmt->fetch();

    return  print json_encode([$question, $reponse]);

?>