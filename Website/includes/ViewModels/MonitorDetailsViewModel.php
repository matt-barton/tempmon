<?php

require_once VIEW_MODELS . 'MeasurementViewModel.php';
require_once VIEW_MODELS . 'MonitorIdentityViewModel.php';

class MonitorDetailsViewModel
{
	public $MonitorId;
	public $Identification;
	public $FirstMeasurement;
	public $LastMeasurement;
	
	public function __construct(Monitor $monitor)
	{
		$this->MonitorId = $monitor->GetId();

		$identities = $monitor->GetIdentities();
		$this->Identification = new MonitorIdentityViewModel($identities[0]);

		$measurements = $monitor->GetMeasurements();

		$this->FirstMeasurement = new MeasurementViewModel();
		$this->FirstMeasurement->SetValuesFromMeasurement($measurements[0]) ;

		$this->LastMeasurement = new MeasurementViewModel();
		$this->LastMeasurement->SetValuesFromMeasurement($measurements[count($measurements) - 1]);
	}
}

?>