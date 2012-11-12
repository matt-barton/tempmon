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
                         WHERE mea.monitorId = mon.monitorId)
			  ORDER BY mon.monitorId";
	}
	
	public static function FindAllIdentified ()
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "SELECT *
                  FROM " . $prefix . "Monitor mon
                 WHERE mon.Location IS NOT NULL";
	}

	public static function AddLocationToUnidentified($monitorId, $location)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return 
			"UPDATE " . $prefix . "Monitor
		        SET location = '". addslashes($location) ."'
			  WHERE location IS NULL
			    AND monitorId = $monitorId";
	}

	public static function MoveIdentificationFromUnidentifiedMonitorToIdentifiedMonitor
		($identifiedMonitorId, $unidentifiedMonitorId)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return
			"UPDATE " . $prefix . "MonitorIdentity AS ident
               JOIN " . $prefix . "Monitor AS mon
                 ON ident.monitorId = mon.monitorId
                SET ident.monitorId = $identifiedMonitorId
              WHERE ident.monitorId = $unidentifiedMonitorId
                AND mon.location IS NULL";
	}
	
	public static function MoveMeasurementsFromUnidentifiedMonitorToIdentifiedMonitor
		($identifiedMonitorId, $unidentifiedMonitorId)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return
			"UPDATE " . $prefix . "Measurement AS mea
               JOIN " . $prefix . "Monitor AS mon
                 ON mea.monitorId = mon.monitorId
                SET mea.monitorId = $identifiedMonitorId
              WHERE mea.monitorId = $unidentifiedMonitorId
                AND mon.location IS NULL";
	}
	
	public static function RemoveUnidentifiedMonitor($unidentifiedMonitorId)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return 
		"DELETE FROM mon
                   USING " . $prefix . "Monitor AS mon
               LEFT JOIN " . $prefix . "Measurement AS mea
                      ON mon.monitorId = mea.monitorId
               LEFT JOIN " . $prefix . "Monitoridentity AS ident
                      ON mon.monitorId = ident.monitorId
                   WHERE mon.monitorId = $unidentifiedMonitorId
		             AND ident.identity IS NULL 
                     AND mea.measurementId IS NULL
                     AND mon.location IS NULL";
	}
	
	public static function Rename($monitorId, $name)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return 
			"UPDATE " . $prefix . "Monitor
			    SET Location = '$name'
			  WHERE MonitorId = $monitorId";
	}

	public static function GetDetails($monitorId)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "SELECT mon.monitorId as id,
		               mon.location as location,
                       first.measurementId as firstId,
                       first.time as firstTime,
                       first.celsius as firstCelsius,
                       first.farenheit as firstFarenheit,
                       last.measurementId as lastId,
                       last.time as lastTime,
                       last.celsius as lastCelsius,
                       last.farenheit as lastFarenheit,
                       id.*
                  FROM " . $prefix . "Monitor mon
                  JOIN " . $prefix . "Measurement first
                    ON mon.monitorId = first.monitorId
                  JOIN " . $prefix . "Measurement last 
                    ON mon.monitorId = last.monitorId
                  JOIN " . $prefix . "MonitorIdentity id 
                  	ON mon.monitorId = id.monitorId
                 WHERE first.time = 
				       (SELECT MIN(time)
                          FROM " . $prefix . "Measurement mea
                         WHERE mea.monitorId = mon.monitorId)
                 AND last.time = 
				       (SELECT MAX(time)
                          FROM " . $prefix . "Measurement mea
                         WHERE mea.monitorId = mon.monitorId)
				 AND id.identityId = 
				 	   (SELECT MAX(identityId)
				 	   	  FROM " . $prefix . "MonitorIdentity id
				 	   	 WHERE id.monitorId = mon.monitorId)
			     AND mon.monitorId = " . $monitorId;

	}
}

?>