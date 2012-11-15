<?php

/* MonitorJsonService */

require_once WEB_SERVICES . "JsonWebService.php";
require_once INCLUDES     . "MonitorService.php";
require_once VIEW_MODELS  . 'MonitorSummaryViewModel.php';
require_once VIEW_MODELS  . 'UnidentifiedMonitorsViewModel.php';
require_once VIEW_MODELS  . 'MonitorDetailsViewModel.php';
require_once VIEW_MODELS  . 'MonitorHistoryViewModel.php';

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
				$this->_monitorService->AddLocationToUnidentifedMonitor($monitorId, $location);
				break;
				
			case 'UpdateMonitorWithUnidentifiedData':
				$existingMonitorId = $this->GetParameter('ExistingMonitorId');
				$unidentifiedMonitorId = $this->GetParameter('UnidentifiedMonitorId');
				$this->_monitorService->MoveDataFromUnidentifiedMonitorToIdentifiedMonitor
					($existingMonitorId, $unidentifiedMonitorId);
				break;
			
			case 'RenameMonitor':
				$monitorId = $this->GetParameter('MonitorId', true);
				$name = $this->GetParameter('Name', true);
				$this->_monitorService->RenameMonitor($monitorId, $name);
				break;
				
			case 'GetMonitorDetails':
				$monitorId = $this->GetParameter('MonitorId', true);
				$this->MonitorDetails($monitorId);
				break;

			case 'GetHistory':
				$monitorId = $this->GetParameter('MonitorId', true);
				$range = $this->GetParameter('Range', false, '1d');
				$this->MonitorHistory($monitorId, $range);
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

	private function MonitorDetails($monitorId)
	{
		$monitor = $this->_monitorService->GetMonitorDetails($monitorId);
		$this->SetOutput(new MonitorDetailsViewModel($monitor));
	}

	private function MonitorHistory($monitorId, $range)
	{
		$start = new DateTime;
		$end = new DateTime;
		switch ($range)
		{

			case '1m':
				$start = $start->modify('-1 month');
				break;

			case '1w':
				$start = $start->modify('-1 week');
				break;

			case '1d':
			default:
				$start = $start->modify('-1 day');
				break;
		}

		$monitor = $this->_monitorService->GetHistory($monitorId, $start, $end);
		$this->SetOutput(new MonitorHistoryViewModel($monitor, $range));
	}
}

?>