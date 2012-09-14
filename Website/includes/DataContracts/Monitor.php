<?php

class Monitor
{
	/* Properties */
	private $_id;
	private $_location;
	private $_measurements;
	private $_identities;

	/* Getters & Setters*/
	public function GetId()
	{
		return $this->_id;
	}

	public function GetLocation()
	{
		return $this->_location;
	}

	public function GetMeasurements()
	{
		return $this->_measurements;
	}

	public function GetIdentities()
	{
		return $this->_identities;
	}
		
	/* Constructor */
	public function __construct($id = null, $location = null, $measurements = null, $identities = null)
	{
		$this->_id = $id;
		$this->_location = $location;
		$this->_measurements = $measurements;
		$this->_identities = $identities;
	}
	
	/* SQL Definitions */
	public static function CreateMonitor($location)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "INSERT INTO " . $prefix . "Monitor (
		            location
				) VALUES (
					'$location'
				)";
	}
	
	public static function CreateIdentity($monitorId, $identity, $identityType)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "INSERT INTO " . $prefix . "MonitorIdentity (
					monitorId, identity, identityType
				) VALUES (
					$monitorId, '$identity', '$identityType'
				)";
	}
	
	public static function FindByGuid ($guid)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return "SELECT *
		 	      FROM " . $prefix . "MonitorIdentity mi
			      JOIN " . $prefix . "Monitor m
			        ON mi.monitorId = m.monitorId
				 WHERE mi.identity = '$guid'
				   AND mi.identityType = 'GUID'";
	}
	
	public static function FindByMacAddress ($macAddress)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "SELECT *
		 	      FROM " . $prefix . "MonitorIdentity mi
			      JOIN " . $prefix . "Monitor m
			        ON mi.monitorId = m.monitorId
				 WHERE mi.identity = '$macAddress'
				   AND mi.identityType = 'MAC'";
	}

	public static function FindAllWithCurrentReading ()
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "SELECT *
                  FROM " . $prefix . "Monitor mon
                  JOIN " . $prefix . "Measurement mea
                    ON mon.monitorId = mea.monitorId
                 WHERE mea.time = 
				       (SELECT MAX(time)
                          FROM tempmon_Measurement mea
                         WHERE mea.monitorId = mon.monitorId)";
	}
}

?>