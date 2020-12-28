<?php

    include_once '../controle/ExibirDAO.php';

    $field = $_POST['field'];

    $discipline = $_POST['discipline'];

    $array = ['hard' => 'Hard Sciences', 'biological' => 'Biological Sciences', 'socialHuman' => 'Social and Human Sciences'];


    $filter = [];

    if($field != "all"){
        $filter ['Field'] =  $array[$field];
    }

    if($discipline != "All"){
        $filter ['Discipline'] =  $discipline;
    }

    $connection = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    $options = ['sort' => ['Field' => 1]];

    $query = new MongoDB\Driver\Query($filter,$options);

    $results = $connection->executeQuery("BasicTextPipeline.pre_processamento", $query);



    $dados             = new ExibirDAO;

    $exibir            = $dados->abrir();

    foreach ($results as $document){

        $dados->_id = $document->_id;
        $dados->Field = $document->Field;
        $dados->Discipline = $document->Discipline;
        $dados->Journal = $document->Journal;
        $dados->TitleFileRaw = $document->TitleFileRaw;
        $dados->PublicationYear = $document->PublicationYear;
        $dados->PublicationDate = $document->PublicationDate;

        $exibir .= json_encode($dados);

        $exibir .= $dados->virgula();

    }



    $exibir = $dados->fechar($exibir);

    echo $exibir;

?>
