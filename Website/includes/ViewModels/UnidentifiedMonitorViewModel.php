<?php

require_once VIEW_MODELS . 'MeasurementViewModel.php';

class UnidentifiedMonitorViewModel
{
	public $MonitorId;
	public $FirstActivity;
	public $LastActivity;
	
	public function __construct($monitor)
	{
		$firstActivity = new MeasurementViewModel();
		$firstActivity->SetValuesFromMeasurement($monitor->GetFirstMeasurement());
		
		$lastActivity = new MeasurementViewModel();
		$lastActivity->SetValuesFromMeasurement($monitor->GetLastMeasurement());
		
		$this->MonitorId = $monitor->GetId();
		$this->FirstActivity = $firstActivity;
		$this->LastActivity = $lastActivity;
	}
}

?>