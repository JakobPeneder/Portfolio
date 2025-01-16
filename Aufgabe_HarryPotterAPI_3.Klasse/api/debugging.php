<?php
/**
 * Pretty var_dump() print.
 * @param mixed $variable The variable to be dumped.
 * @return void
 */
function vardumppretty($variable){
    echo "<pre style='font-size: 120%;'>";
    var_dump($variable);
    echo "</pre>";
}
