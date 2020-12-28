<?php

class ExibirDAO
{
    function abrir() {
        return "[";
    }

    function fechar($dados) {
        $tamanho = strlen($dados);

        return substr($dados, 0, $tamanho - 1) . "]";
    }

    function virgula() {
        return ",";
    }

    function pular() {
        return "<br>";
    }
}

?>