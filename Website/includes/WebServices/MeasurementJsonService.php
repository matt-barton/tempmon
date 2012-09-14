<?php

/* MeasurementJsonService */

require_once (WEB_SERVICES . "JsonWebService.php");
require_once (INCLUDES . "MonitorService.php");

class MeasurementJsonService extends JsonWebService {
	
	public function __construct() {
		
		parent::__construct();
		
		$method = $this->GetMethod();

		switch ($method)
		{
			case 'NewMeasurement':
				$this->NewMeasurement();
				break;
			
			default:
				die();
				break;
		}	
	}

	private function NewMeasurement() {
		$identity = Request::Get('identity');
		if (Request::IsNullOrEmpty($identity))
		{
			$this->AddOutput('success', false);
			$this->AddOutput('errors', 'identity is required');
		}
		
		$identityType = Request::Get('identityType');
		if (Request::IsNullOrEmpty($identityType))
		{
			$this->AddOutput('success', false);
			$this->AddOutput('errors', 'identityType is required');
		}
		
		$time = Request::Get('time');
		if (Request::IsNullOrEmpty($time))
		{
			$this->AddOutput('success', false);
			$this->AddOutput('errors', 'time is required');
		}
		
		$celsius = Request::Get('celsius');
		$farenheit = Request::Get('farenheit');
		if (Request::IsNullOrEmpty($celsius) && Request::IsNullOrEmpty($farenheit))
		{
			$this->AddOutput('success', false);
			$this->AddOutput('errors', 'Either celsius or farenheit is required');
		}
		
		if (!empty($this->_output['errors']))
		{
			return;
		}

		$monitorService = new MonitorService();
		
		$success = $monitorService->NewMeasurement($identity, $identityType, $time, $celsius, $farenheit);
		
		$this->AddOutput('success', $success);
	}
}

?>