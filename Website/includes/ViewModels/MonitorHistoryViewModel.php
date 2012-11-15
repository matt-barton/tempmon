<?php

require_once VIEW_MODELS . 'MeasurementViewModel.php';
require_once VIEW_MODELS . 'MonitorIdentityViewModel.php';

class MonitorHistoryViewModel
{
	public $MonitorId;
	public $Identification;
	public $Measurements;
	public $Range;

	public function __construct(Monitor $monitor, $range)
	{
		$this->MonitorId = $monitor->GetId();
		$this->Range = $range;

		$identities = $monitor->GetIdentities();

		$this->Identification = new MonitorIdentityViewModel($identities[0]);

		$this->Measurements = array();

		$measurements = $monitor->GetMeasurements();

		foreach ($measurements as $measurement)
		{
			$thisMeasurememnt = new MeasurementViewModel();
			$thisMeasurememnt->SetValuesFromMeasurement($measurement);
			$this->Measurements[] = $thisMeasurememnt;
		}
	}
}

?>