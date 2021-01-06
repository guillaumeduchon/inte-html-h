<?php
    /**
     * Config
     * Author: Agence Surf
     */

    $protocol = 'https';

    $host= $protocol . '://' . $_SERVER['SERVER_NAME'];


    $host = '127.0.0.1';
    $db   = 'jeu_hermes';
    $user = 'hermes_surf';
    $pass = 'Surf2020!';
    $port = "3306";
    $charset = 'utf8mb4';

    // $host = '127.0.0.1';
    // $db   = 'hermes';
    // $user = 'root';
    // $pass = '';
    // $port = "3306";
    // $charset = 'utf8mb4';

    $options = [
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset;port=$port";

    try {
        $pdo = new \PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
            $u = $e->getMessage();
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
?>