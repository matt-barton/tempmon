<?php

class MeasurementViewModel
{
	public $MeasurementId;
	public $MonitorId;
	public $Time;
	public $Celsius;
	public $Farenheit;
	
	public function __construct (
		$measurementId = null,
		$monitorId = null,
		$time = null,
		$celsius = null,
		$farenheit = null)
	{
		$this->MeasurementId = $measurementId;
		$this->MonitorId = $monitorId;
		$this->Time = $time;
		$this->Celsius = $celsius;
		$this->Farenheit = $farenheit;	
	}
	
	public function SetValuesFromMeasurement($measurement)
	{
		$this->MeasurementId = $measurement->GetId();
		$this->MonitorId = $measurement->GetMonitorId();
		$this->Time = $measurement->GetTime();
		$this->Celsius = $measurement->GetCelsius();
		$this->Farenheit = $measurement->GetFarenheit();	
	}
}

?>