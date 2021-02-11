<?php

    require_once 'dotenv.php';

    /**
     * Config
     * Author: Agence Surf
     */

    // $protocol = 'https';

    // $host= $protocol . '://' . $_SERVER['SERVER_NAME'];

    $host = '127.0.0.1';
    $db   = 'jeu_hermes';
    $user = 'hermes';
    $pass = 'Vpspassword1.';
    $port = "3306";
    $charset = 'utf8mb4';


    // $_ENV = new DotEnv(__DIR__ . '/.env')->load();

    // echo getenv('APP_ENV');
    // dev
    // echo getenv('DATABASE_DNS');

    // $host = '127.0.0.1'; //$_ENV->getenv('APP_HOST')
    // $db   = 'jeu_hermes'; //$_ENV->getenv('APP_BDD')
    // $user = 'root'; //$_ENV->getenv('APP_USER')
    // $pass = ''; //$_ENV->getenv('APP_PASS')
    // $port = "3306"; //$_ENV->getenv('APP_PORT')
    // $charset = 'utf8mb4'; //$_ENV->getenv('APP_CHARSET')


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