<?php
require_once 'config.php';

$somme = 0;
$array_response = [];

function makeSomme($datas)
{
    if (!$datas) return [];
    array_map('cube', $datas);
}

function cube($n)
{
    global $somme;
    $somme += $n['nbr'];
}

function makePercent($aReponse)
{
    global $somme;
    foreach ($aReponse as $resp) {
        $array_response[$resp['response']] = round(((int)$resp['nbr'] / $somme) * 100, 1, PHP_ROUND_HALF_DOWN) ;
    }
    return $array_response;
}

$stmt = $pdo->prepare(
    "SELECT content as response , COUNT(content) as nbr  FROM `reponse` WHERE content IN( '1', '2', '3') group by content;"
);
$stmt->execute();
$aReponse = $stmt->fetchAll();

makeSomme($aReponse);
$aResult = makePercent($aReponse);

return  print json_encode($aResult);
