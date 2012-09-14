<?php

require_once '../Configuration.php';
require_once WEB_SERVICES . 'MonitorJsonService.php';

$service = new MonitorJsonService();
$service->Display();

?>