<?php

require_once VIEW_MODELS . 'UnidentifiedMonitorViewModel.php';
require_once VIEW_MODELS . 'MonitorViewModel.php';

class UnidentifiedMonitorsViewModel
{
	var $IdentifiedMonitors = array();
	var $UnidentifiedMonitors = array();
	
	public function __construct($unidentifiedMonitors, $identifiedMonitors)
	{
		foreach ($unidentifiedMonitors as $monitor)
		{
			$this->UnidentifiedMonitors[] = new UnidentifiedMonitorViewModel($monitor);
		}
		
		foreach ($identifiedMonitors as $monitor)
		{
			$this->IdentifiedMonitors[] = new MonitorViewModel($monitor);
		}
	}		
}

?>