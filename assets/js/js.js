var field = 'all';

var arrayDisciplines = {
    "all": [
        "Cognitive Linguistics",
        "Communication",
        "Linguistics",
        "Information science and library science",
        "Business",
        "Education, scientific disciplines",
        "Engineering, Multidisciplinary",
        "Chemistry, Multidisciplinary",
        "Telecommunications",
        "Physics, Multidisciplinary",
        "Agronomy",
        "Computer Science, Interdisciplinary applications",
        "Neurosciences",
        "Medicine, research and experimental",
        "Biology",
        "Health Care Sciences and Services",
        "Nutrition and Dietetics",
        "Psychology, Multidisciplinary"
    ],
    "hard": [
        "Agronomy",
        "Chemistry, Multidisciplinary",
        "Computer Science, Interdisciplinary applications",
        "Engineering, Multidisciplinary",
        "Physics, Multidisciplinary",
        "Telecommunications"
    ],
    "biological": [
        "Biology",
        "Health Care Sciences and Services",
        "Medicine, research and experimental",
        "Neurosciences",
        "Nutrition and Dietetics",
        "Psychology, Multidisciplinary"
    ],
    "socialHuman": [
        "Cognitive Linguistics",
        "Communication",
        "Linguistics",
        "Information science and library science",
        "Business",
        "Education, scientific disciplines"
    ]
};


function setSelectDisciplines(value) {
    $("#disciplineSelect option").remove();

    let select = document.getElementById("disciplineSelect");

    let option = document.createElement("option");


    arrayDisciplines[field].forEach(function (retorno, chave) {
        let option = document.createElement("option");

        option.text = retorno;
        option.value = retorno;

        select.add(option, select[chave]);

    })

    option.text = "All";
    option.value = "All";

    select.add(option, select[0]);

    if (!value){
        document.getElementById('disciplineSelect').value = "All";
    }
    else {
        document.getElementById('disciplineSelect').value = value;
    }
}


function setFieldButton(value){
    if (field != value) {

        field = value;

        document.getElementById(field).classList.remove('btn-secondary');
        document.getElementById(field).classList.add('btn-success');

        if (field == 'all') {
            document.getElementById('hard').classList.remove('btn-success');
            document.getElementById('hard').classList.add('btn-secondary');

            document.getElementById('biological').classList.remove('btn-success');
            document.getElementById('biological').classList.add('btn-secondary');

            document.getElementById('socialHuman').classList.remove('btn-success');
            document.getElementById('socialHuman').classList.add('btn-secondary');
        } else if (field == 'hard') {
            document.getElementById('all').classList.remove('btn-success');
            document.getElementById('all').classList.add('btn-secondary');

            document.getElementById('biological').classList.remove('btn-success');
            document.getElementById('biological').classList.add('btn-secondary');

            document.getElementById('socialHuman').classList.remove('btn-success');
            document.getElementById('socialHuman').classList.add('btn-secondary');
        } else if (field == 'biological') {
            document.getElementById('hard').classList.remove('btn-success');
            document.getElementById('hard').classList.add('btn-secondary');

            document.getElementById('all').classList.remove('btn-success');
            document.getElementById('all').classList.add('btn-secondary');

            document.getElementById('socialHuman').classList.remove('btn-success');
            document.getElementById('socialHuman').classList.add('btn-secondary');
        } else if (field == 'socialHuman') {
            document.getElementById('hard').classList.remove('btn-success');
            document.getElementById('hard').classList.add('btn-secondary');

            document.getElementById('biological').classList.remove('btn-success');
            document.getElementById('biological').classList.add('btn-secondary');

            document.getElementById('all').classList.remove('btn-success');
            document.getElementById('all').classList.add('btn-secondary');
        }

        setSelectDisciplines();

        atualizarTabelaPrincipal();
    }
}



listagemAbstracts();

setSelectDisciplines();



function listagemAbstracts() {

    $.ajax({
        url:'processos/buscar.php',
        data: { 'field' : field, 'discipline': "All"},
        startTime: performance.now(),
        type: 'POST',
        success: function(retorno) {
            retorno = $.parseJSON(retorno);

            var cont = 0;
            var table = document.getElementById("tabela_principal");


            retorno.forEach(function (retorno, chave) {


                var row = table.insertRow(cont);

                cont++;

                var contador = row.insertCell(0);;
                var Field = row.insertCell(1);
                var Discipline = row.insertCell(2);
                var Journal = row.insertCell(3);
                var TitleFileRaw = row.insertCell(4);
                var PublicationYear = row.insertCell(5);
                var PublicationDate = row.insertCell(6);
                var Actions = row.insertCell(7)

                contador.innerHTML = cont;
                Field.innerHTML = retorno.Field;
                Discipline.innerHTML = retorno.Discipline;
                Journal.innerHTML = retorno.Journal;
                TitleFileRaw.innerHTML = retorno.TitleFileRaw;
                PublicationYear.innerHTML = retorno.PublicationYear;
                PublicationDate.innerHTML = retorno.PublicationDate;

                let id = (retorno._id['$oid']).toString();

                let fieldRetorno = retorno.Field;

                // let actions =  `<button type="button" class="btn btn-primary btn-xs" >/button> <button type="button" class="btn btn-success btn-xs" ><i class="fa fa-download"></i></button>`;

                let actions = `<div class="btn-group btn-group-sm" ><button type="button" class="btn btn-primary" onclick="visualizarAbstract('${id}', '${fieldRetorno}')"><i class="fa fa-eye"></i></button><button type="button" class="btn btn-success" onclick="downloadAbstract('${id}', '${fieldRetorno}')"><i class="fas fa-download"></i></button></div>`;
                // let actions = `<a href="javascript:void(0)" onclick="visualizarAbstract('${id}')"><i class="fa fa-eye"></i></a><a href="javascript:void(0)" onclick="downloadAbstract('${id}')"> <i class="fa fa-download"></i></a>`;

                Actions.innerHTML = actions;
            });

            //Calculate the difference in milliseconds.
            var time = performance.now() - this.startTime;

            //Convert milliseconds to seconds.
            var seconds = time / 1000;

            //Round to 3 decimal places.
            seconds = seconds.toFixed(5);

            //Write the result to the HTML document.
            document.getElementById("runTimeValue").innerHTML = seconds + " seconds";

        }
    });
}



function visualizarAbstract(_id, fieldText){
    $.ajax({
        url:'processos/visualizar.php',
        data: { 'Field': fieldText, '_id' : _id},
        type: 'POST',
        success: function(retorno) {
            retorno = $.parseJSON(retorno);

            document.getElementById("Field").value      = retorno.Field;
            document.getElementById("Discipline").value      = retorno.Discipline;
            document.getElementById("Journal").value      = retorno.Journal;
            document.getElementById("TitleFileRaw").value      = retorno.TitleFileRaw;
            document.getElementById("TitleFileBTP").value      = retorno.TitleFileBTP;
            document.getElementById("DOI").value      = retorno.DOI;
            document.getElementById("Source").value      = retorno.Source;
            document.getElementById("TitleAbstract").value      = retorno.TitleAbstract;
            document.getElementById("PublicationYear").value      = retorno.PublicationYear;
            document.getElementById("PublicationDate").value      = retorno.PublicationDate;
            document.getElementById("File").value      = retorno.FileConverted;

            $("#modalAbstract").modal('show');

        }
    });
}


$(document).ready(function(){
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tabela_principal tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});



function downloadAbstract(_id, fieldText){
    $.ajax({
        url:'processos/download.php',
        data: {'Field': fieldText, '_id' : _id},
        type: 'POST',
        success: function(retorno) {
            retorno = $.parseJSON(retorno);

            var text = retorno.FileConverted
            var filename = retorno.TitleFileRaw+'.txt';

            download(filename, text);

        }
    });
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function atualizarTabelaPrincipal(){

    var discipline = document.getElementById('disciplineSelect').value;

    var icon = document.getElementById('iconRefresh');
    icon.classList.add('fa-spin');

    $.ajax({
        url:'processos/buscar.php',
        data: { 'field' : field, 'discipline': discipline},
        startTime: performance.now(),
        type: 'POST',
        success: function(retorno) {
            retorno = $.parseJSON(retorno);

            var cont = 0;
            var table = document.getElementById("tabela_principal");

            $("#tabela_principal tr").remove();

            retorno.forEach(function (retorno, chave) {


                var row = table.insertRow(cont);

                cont++;

                var contador = row.insertCell(0);
                var Field = row.insertCell(1);
                var Discipline = row.insertCell(2);
                var Journal = row.insertCell(3);
                var TitleFileRaw = row.insertCell(4);
                var PublicationYear = row.insertCell(5);
                var PublicationDate = row.insertCell(6);
                var Actions = row.insertCell(7)

                contador.innerHTML = cont;
                Field.innerHTML = retorno.Field;
                Discipline.innerHTML = retorno.Discipline;
                Journal.innerHTML = retorno.Journal;
                TitleFileRaw.innerHTML = retorno.TitleFileRaw;
                PublicationYear.innerHTML = retorno.PublicationYear;
                PublicationDate.innerHTML = retorno.PublicationDate;

                let id = (retorno._id['$oid']).toString();

                let fieldRetorno = retorno.Field;

                // let actions =  `<button type="button" class="btn btn-primary btn-xs" >/button> <button type="button" class="btn btn-success btn-xs" ><i class="fa fa-download"></i></button>`;

                let actions = `<div class="btn-group btn-group-sm" ><button type="button" class="btn btn-primary" onclick="visualizarAbstract('${id}', '${fieldRetorno}')"><i class="fa fa-eye"></i></button><button type="button" class="btn btn-success" onclick="downloadAbstract('${id}', '${fieldRetorno}')"><i class="fas fa-download"></i></button></div>`;
                // let actions = `<a href="javascript:void(0)" onclick="visualizarAbstract('${id}')"><i class="fa fa-eye"></i></a><a href="javascript:void(0)" onclick="downloadAbstract('${id}')"> <i class="fa fa-download"></i></a>`;

                Actions.innerHTML = actions;
            });


            icon.classList.remove('fa-spin');

            //Calculate the difference in milliseconds.
            var time = performance.now() - this.startTime;

            //Convert milliseconds to seconds.
            var seconds = time / 1000;

            //Round to 3 decimal places.
            seconds = seconds.toFixed(5);

            //Write the result to the HTML document.
            document.getElementById("runTimeValue").innerHTML = seconds + " seconds";

        }
    });
}


function setValueDiscipline(value) {
    atualizarTabelaPrincipal();
}



