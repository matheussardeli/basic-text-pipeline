<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/css.css">
</head>
<body>


<nav class="navbar navbar-expand-sm bg-success navbar-dark">
    <ul class="navbar-nav">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Basic Text Pipeline</a>
        </div>
        <li class="nav-item active">
            <a class="nav-link" href="#">Abstracts</a>
        </li>
    </ul>
</nav>


<div class="container-fluid pt-3" style="width: 80%!important;">
    <h2>Filterable Table</h2>
    <p>Type something in the input field to search the table for specific items:</p>
    <p>Runtime: <span id="runTimeValue" name="runTimeValue">0</span></p>

    <div class="row mb-3">

        <div class="col-md-3 mt-3">
            <button type="button" class="btn btn-success btn-lg btn-block" id="all" name="all" onclick="setFieldButton('all')">All</button>
        </div>
        <div class="col-md-3 mt-3">
            <button type="button" class="btn btn-secondary btn-lg btn-block" id="hard" name="hard" onclick="setFieldButton('hard')">Hard Sciences</button>
        </div>
        <div class="col-md-3 mt-3">
            <button type="button" class="btn btn-secondary btn-lg btn-block" id="biological" name="biological" onclick="setFieldButton('biological')">Biological Sciences</button>
        </div>
        <div class="col-md-3 mt-3">
            <button type="button" class="btn btn-secondary btn-lg btn-block" id="socialHuman" name="socialHuman" onclick="setFieldButton('socialHuman')">Social and Human Sciences</button>
        </div>

    </div>
    <br>

    <div class="mb-5">
        <div class="form-group mb-3">
            <label for="exampleFormControlSelect1">Discipline</label>
            <select class="form-control" id="disciplineSelect" onchange="setValueDiscipline(this.value)">
            </select>
        </div>
    </div>

    <div class="input-group mb-3 mt-5">
        <input class="form-control" id="myInput" type="text" placeholder="Search..">
        <div class="input-group-append">
            <button type="button" class="btn btn-success" id="buttonRefreshTable" name="buttonRefreshTable" onclick="atualizarTabelaPrincipal()"><i class="fas fa-sync-alt" id="iconRefresh" name="iconRefresh"></i></button>
        </div>
    </div>

    <div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead class="thead-success">
        <tr>
            <th scope="col">#</th>
            <th>Field</th>
            <th>Discipline</th>
            <th>Journal</th>
            <th>Title File Raw</th>
            <th>Publication Year</th>
            <th>Publication Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody  id="tabela_principal" name="tabela_principal">
        <!-- Preenchido dinamicamente através do javascript -->
        </tbody>
    </table>
    </div>
</div>

<?php include "complementos/pre-processamento/modal.php"; ?>
<script src="assets/js/js.js"></script>

</body>
</html>
