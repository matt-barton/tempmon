<?php

/* MonitorService */

require_once (INCLUDES . "DatabaseService.php");
require_once (DATA_CONTRACTS . "Monitor.php");
require_once (DATA_CONTRACTS . "UnidentifiedMonitor.php");
require_once (DATA_CONTRACTS . "Measurement.php");

class MonitorService {
	
	private $db;
	
	public function __construct()
	{
		$this->db = new DatabaseService();	
	}
	
	/* Public Methods */
	public function NewMeasurement($identity, $identityType, $time, $celsius, $farenheit)
	{
		try
		{
			$monitorId = $this->IdentifyMonitor($identity, $identityType);
		}
		catch (Exception $ex)
		{
			error_log (print_r($ex));
			return false;
		}
		
		if ($monitorId === null)
		{
			try
			{
				$this->db->query(Monitor::CreateMonitor(""));
			}
			catch (exception $ex)
			{
				error_log (print_r($ex));
				return false;
			}
			$monitorId = $this->db->InsertId();
			
			try
			{
				$this->db->query(Monitor::CreateIdentity($monitorId, $identity, $identityType));
			}
			catch (exception $ex)
			{
				error_log (print_r($ex));
				return false;
			}
		}
		
		try
		{
			$this->db->query(Measurement::Save($monitorId, $time, $celsius, $farenheit));
		}
		catch (Exception $ex)
		{
			error_log (print_r($ex));
			return false;
		}
		
		return true;
	}
	
	public function GetAllWithCurrentMeasurement()
	{
		$monitors = array();
		try
		{
			$this->db->query(Monitor::FindAllWithCurrentReading());

			while ($row = $this->db->GetRow())
			{
				$measurement = new Measurement(
					$row['measurementId'], 
					$row['monitorId'], 
					$row['time'], 
					$row['celsius'], 
					$row['farenheit']);

				$monitor = 
				 new Monitor(
					$row['monitorId'],
					$row['location'],
					array($measurement));
				
				$monitors[] = $monitor;
			}
			
			return $monitors;
		}
		catch(exception $ex)
		{
			return false;
		}
	}

	public function GetIdentifiedMonitors()
	{
		$monitors = array();
		try
		{
			$this->db->query(Monitor::FindAllIdentified());

			while ($row = $this->db->GetRow())
			{
				$monitor = new Monitor(
					$row['monitorId'],
					$row['location']);
				
				$monitors[] = $monitor;
			}
			
			return $monitors;
		}
		catch(exception $ex)
		{
			return false;
		}
	}

	public function GetUnidentifiedMonitors()
	{
		$unidentifiedMonitors = array();
		try
		{
			$this->db->query(UnidentifiedMonitor::FindAll());
			while ($row = $this->db->GetRow())
			{
				$firstMeasurement = new Measurement(
					$row['firstId'], 
					$row['monitorId'], 
					$row['firstTime'], 
					$row['firstCelsius'], 
					$row['firstFarenheit']);

				$lastMeasurement = new Measurement(
					$row['lastId'], 
					$row['monitorId'], 
					$row['lastTime'], 
					$row['lastCelsius'], 
					$row['lastFarenheit']);

				$monitor = 
					new UnidentifiedMonitor(
					$row['monitorId'],
					$firstMeasurement,
					$lastMeasurement);
				
				$unidentifiedMonitors[] = $monitor;
			}
			return $unidentifiedMonitors;
		}
		catch(Exception $ex)
		{
			return false;
		}
	}
	
	/* Private Methods */
	private function IdentifyMonitor($identity, $identityType) {
		
		try
		{
			$this->db->query(Monitor::FindByGuid($identity, $identityType));
			if ($this->db->NumRows() > 0)
			{
				$row = $this->db->GetRow();
				return $row['monitorId'];
			}
			
			$this->db->query(Monitor::FindByMacAddress($identity, $identityType));
			if ($this->db->NumRows() > 0)
			{
				$row = $this->db->GetRow();
				return $row['monitorId'];
			}
			
			return null;
		}
		catch (Exception $ex)
		{
			throw $ex;
		}
	}
}

?>