<?php

/* MonitorJsonService */

require_once WEB_SERVICES . "JsonWebService.php";
require_once INCLUDES     . "MonitorService.php";
require_once VIEW_MODELS  . 'MonitorSummaryViewModel.php';
require_once VIEW_MODELS  . 'UnidentifiedMonitorsViewModel.php';

class MonitorJsonService extends JsonWebService {
	
	private $_monitorService;

	public function __construct() {
		
		parent::__construct();
		
		$this->_monitorService =  new MonitorService();
		
		$method = $this->GetMethod();

		switch ($method)
		{
			case 'GetSummary':
				$this->GetSummary();
				break;
			
			case 'GetUnidentifiedMonitors':
				$this->GetUnidentifiedMonitors();
				break;
				
			case 'IdentifyMonitor':
				$monitorId = $this->GetParameter('MonitorId');
				$location = $this->GetParameter('Location');
				$this->AddLocationToUnidentifiedMonitor($monitorId, $location);
				break;
				
			case 'UpdateMonitorWithUnidentifiedData':
				$existingMonitorId = $this->GetParameter('ExistingMonitorId');
				$unidentifiedMonitorId = $this->GetParameter('UnidentifiedMonitorId');
				$this->UpdateMonitorWithUnidentifiedData($existingMonitorId, $unidentifiedMonitorId);
				break;
			
			default:
				die();
				break;
		}	
	}

	private function GetSummary()
	{
		$monitors = $this->_monitorService->GetAllWithCurrentMeasurement();
		
		$this->SetOutput(new MonitorSummaryViewModel($monitors));
	}
	
	private function GetUnidentifiedMonitors()
	{
		$unidentifiedMonitors = $this->_monitorService->GetUnidentifiedMonitors();
		$identifiedMonitors = $this->_monitorService->GetIdentifiedMonitors();
		$this->SetOutput(new UnidentifiedMonitorsViewModel($unidentifiedMonitors, $identifiedMonitors));
	}
	
	private function AddLocationToUnidentifiedMonitor($monitorId, $location)
	{
		$this->_monitorService->AddLocationToUnidentifedMonitor($monitorId, $location);
	}
	
	private function UpdateMonitorWithUnidentifiedData($existingMonitorId, $unidentifiedMonitorId)
	{
		$this->_monitorService->MoveDataFromUnidentifiedMonitorToIdentifiedMonitor($existingMonitorId, $unidentifiedMonitorId);
	}
}

?>