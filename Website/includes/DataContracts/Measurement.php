<?php

class Measurement
{
	private $_config;
	private $_id;
	private $_monitorId;
	private $_time;
	private $_celsius;
	private $_farenheit;
	
	public function GetId ()
	{
		return $this->_id;
	}

	public function GetMonitorId ()
	{
		return $this->_monitorId;
	}

	public function GetTime ()
	{
		return $this->_time;
	}

	public function GetCelsius ()
	{
		return $this->_celsius;
	}

	public function GetFarenheit ()
	{
		return $this->_farenheit;
	}
	
	public function __construct($id = null, $monitorId = null,
		$time = null, $celsius = null, $farenheit = null)
	{
		$this->_id = $id;
		$this->_monitorId = $monitorId;
		$this->_time = $time;
		$this->_celsius = $celsius;
		$this->_farenheit = $farenheit;
		$this->_config = new Config();
	}
	
	public static function Save ($monitorId, $time, $celsius, $farenheit)
	{
		$config = new Config();
		$prefix = $config->tablePrefix;

		return "INSERT INTO " . $prefix ."Measurement (
					monitorId,
					time,
					celsius,
					farenheit
				) VALUES (
					$monitorId,
					'$time',
					" . (Request::IsNullOrEmpty($celsius) ? 'NULL' : $celsius) .",
					" . (Request::IsNullOrEmpty($farenheit) ? 'NULL' : $farenheit) ."
				)";
	}

}

?>