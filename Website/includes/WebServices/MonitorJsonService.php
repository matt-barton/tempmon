<?php

/* MonitorJsonService */

require_once WEB_SERVICES . "JsonWebService.php";
require_once INCLUDES     . "MonitorService.php";
require_once VIEW_MODELS  . 'MonitorSummaryViewModel.php';

class MonitorJsonService extends JsonWebService {
	
	public function __construct() {
		
		parent::__construct();
		
		$method = $this->GetMethod();

		switch ($method)
		{
			case 'GetSummary':
				$this->GetSummary();
				break;
			
			default:
				die();
				break;
		}	
	}

	private function GetSummary()
	{
		$monitorService = new MonitorService();
		
		$monitors = $monitorService->GetAllWithCurrentMeasurement();
		
		$this->SetOutput(new MonitorSummaryViewModel($monitors));
	}
}

?>