<?php

require_once 'Configuration.php';
require_once INCLUDES . 'MonitorService.php';
require_once TEMPLATE_ENGINE;

$template = new Template("SiteMaster.html");

$contentTemplate = new Template("MonitorSummaryPage.html");
$content = $contentTemplate->Display();

echo $template->Display(array('content' => $content));

?>
