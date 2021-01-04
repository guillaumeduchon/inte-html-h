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
        if (!isset($decoded['login'])) {
            die('Missed action');
        }
        if (!isset($decoded['pwd'])) {
            die('Missed action');
        }

        $ident = $decoded['login'];
        $pwd = $decoded['pwd'];
        $stmt = $pdo->prepare("SELECT * FROM magasin
        WHERE ident=:ident AND `password`=:pwd");
        $stmt->execute(['ident' => $ident, 'pwd'=> $pwd]);
        $login = $stmt->fetch();
      }
    }

    return  print json_encode([$login]);
?>