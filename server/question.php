<?php
    require_once 'config.php';
    
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
        $aDatas = [];
        //Receive the RAW post data.
        $content = trim(file_get_contents("php://input"));
        
        $decoded = json_decode($content, true);
        
        //If json_decode failed, the JSON is invalid.
        if(!is_array($decoded)) {
            die('Missed action');
        } else {
            if (!isset($decoded['day_num'])) {
                die('Missed action');
            }
            if (!isset($decoded['type'])) {
                die('Missed action');
            }
            
            $day_num = (int)$decoded['day_num'];
            $type = htmlentities($decoded['type']);

            $stmt = $pdo->prepare("SELECT id FROM question WHERE jour=:jour");
            $stmt->execute(['jour'=> $day_num]);
            $aQuestion = $stmt->fetch();
           
            if($aQuestion) {
                switch ($type) {
                    case 'rules':
                        $stmt = $pdo->prepare("SELECT rules FROM question WHERE id=:id");
                        $stmt->execute(['id'=> $aQuestion['id']]);
                        $aDatas = $stmt->fetch();
                        break;
                    case 'content':
                        $stmt = $pdo->prepare("SELECT content FROM question WHERE id=:id");
                        $stmt->execute(['id'=> $aQuestion['id']]);
                        $aDatas = $stmt->fetch();
                        break;
                }
            }
        }
    }
    return  print json_encode($aDatas);
?>
