<?php
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    $idMongo = $_POST['_id'];
    $Field = $_POST['Field'];

    $id           = new MongoDB\BSON\ObjectId((string) $idMongo);

    $filter      = ['Field' => $Field, '_id' => $id];
    $options = [];


    $query = new MongoDB\Driver\Query($filter, $options);
    $rows = $manager->executeQuery('BasicTextPipeline.pre_processamento', $query);

    $dados = [];

    foreach ($rows as $document){
        $binary = new MongoDB\BSON\Binary((string)$document->File, MongoDB\BSON\Binary::TYPE_GENERIC);
        //var_dump($binary->getData());

        $document->FileConverted = $binary->getData();

        array_push($dados, $document);
    }

    echo json_encode($dados[0]);

?>