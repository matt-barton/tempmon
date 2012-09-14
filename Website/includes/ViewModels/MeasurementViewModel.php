<?php

class MeasurementViewModel
{
	public $MeasurementId;
	public $MonitorId;
	public $Time;
	public $Celsius;
	public $Farenheit;
	
	public function __construct (
		$measurementId,
		$monitorId,
		$time,
		$celsius,
		$farenheit)
	{
		$this->MeasurementId = $measurementId;
		$this->MonitorId = $monitorId;
		$this->Time = $time;
		$this->Celsius = $celsius;
		$this->Farenheit = $farenheit;	
	}
}

?>