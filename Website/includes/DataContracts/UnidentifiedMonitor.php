<?php

class UnidentifiedMonitor
{
	/* Properties */
	private $_id;
	private $_firstMeasurement;
	private $_lastMeasurement;

	/* Getters & Setters*/
	public function GetId()
	{
		return $this->_id;
	}

	public function GetFirstMeasurement()
	{
		return $this->_firstMeasurement;
	}

	public function GetLastMeasurement()
	{
		return $this->_lastMeasurement;
	}

	/* Constructor */
	public function __construct($id = null, $firstMeasurement = null, $lastMeasurement = null)
	{
		$this->_id = $id;
		$this->_firstMeasurement = $firstMeasurement;
		$this->_lastMeasurement = $lastMeasurement;
	}
	
	/* SQL Definitions */
	public static function FindAll()
	{
		$config = new Config();
		$prefix = $config->tablePrefix;
		
		return "SELECT mon.monitorId,
                       first.measurementId as firstId,
                       first.time as firstTime,
                       first.celsius as firstCelsius,
                       first.farenheit as firstFarenheit,
                       last.measurementId as lastId,
                       last.time as lastTime,
                       last.celsius as lastCelsius,
                       last.farenheit as lastFarenheit
                  FROM " . $prefix . "Monitor mon
                  JOIN " . $prefix . "Measurement last
                    ON mon.monitorId = last.monitorId
                  JOIN " . $prefix . "Measurement first
                    ON mon.monitorId = first.monitorId
                 WHERE last.time = 
				       (SELECT MAX(time)
                          FROM tempmon_Measurement m
                         WHERE m.monitorId = mon.monitorId)
				   AND first.time = 
				       (SELECT MIN(time)
                          FROM tempmon_Measurement m
                         WHERE m.monitorId = mon.monitorId)
				   AND mon.location IS NULL";
	}
}

?>