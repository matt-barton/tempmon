<?php

class MonitorIdentity
{
	private $_id;
	private $_monitorId;
	private $_identity;
	private $_type;
	
	public function GetId ()
	{
		return $this->_id;
	}

	public function GetMonitorId ()
	{
		return $this->_monitorId;
	}

	public function GetIdentity ()
	{
		return $this->_identity;
	}

	public function GetType ()
	{
		return $this->_type;
	}

	
	public function __construct($id = null, $monitorId = null,
		$identity = null, $type = null)
	{
		$this->_id = $id;
		$this->_monitorId = $monitorId;
		$this->_identity = $identity;
		$this->_type = $type;
	}
}

?>