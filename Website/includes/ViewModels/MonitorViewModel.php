<?php

require_once VIEW_MODELS . 'MeasurementViewModel.php';

class MonitorViewModel
{
	public $MonitorId;
	public $Location;
	public $Measurements = array();
	
	public function __construct($monitor)
	{
		$this->MonitorId = $monitor->GetId();
		$this->Location = $monitor->GetLocation();
		foreach ($monitor->GetMeasurements() as $index => $measurement)
		{
			$this->Measurements[] = new MeasurementViewModel(
				$measurement->GetId(),
				$measurement->GetMonitorId(),
				$measurement->GetTime(),
				$measurement->GetCelsius(),
				$measurement->GetFarenheit());
		}
	}
}

?>