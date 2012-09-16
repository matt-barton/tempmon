<?php

require_once VIEW_MODELS . 'MonitorViewModel.php';

class MonitorSummaryViewModel
{
	public $UnidentifiedMonitor = false;
	public $Monitors = array();
	
	public function __construct($monitors)
	{
		foreach ($monitors as $monitor)
		{
			$this->Monitors[] = new MonitorViewModel($monitor);
			if (String::IsNullOrEmpty($monitor->GetLocation())) {
				$this->UnidentifiedMonitor = true;
			}
		}
	}		
}