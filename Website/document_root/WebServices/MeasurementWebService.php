<?php

/* MeasurementWebService */

require_once ('../Configuration.php');
require_once (WEB_SERVICES . "MeasurementJsonService.php");

$service = new MeasurementJsonService();
$service->Display();

?>