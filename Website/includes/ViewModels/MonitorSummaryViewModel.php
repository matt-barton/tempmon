<?php

require_once VIEW_MODELS . 'MonitorViewModel.php';

class MonitorSummaryViewModel
{
	public $UnidentifiedMonitor = false;
	public $Monitors = array();
	
	public function __construct($unidentifiedMonitor, $monitors)
	{
		$this->UnidentifiedMonitor = $unidentifiedMonitor;
		foreach ($monitors as $monitor)
		{
			$this->Monitors[] = new MonitorViewModel($monitor);
		}
	}		
}