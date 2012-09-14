<?php

/* DatabaseService */

require_once (EXCEPTIONS . 'DatabaseException.php');

class DatabaseService {
	
	/* Properties */
	private $_connection;
	private $_resultSet;
	
	/* Public Methods */
	public function Query($sql)
	{
		if (!isset($this->_connection))
		{
			$this->Connect();
		}
		
		try
		{
			$this->_resultSet = $this->_connection->query($sql);
		}
		catch (Exception $ex)
		{
			error_log($sql);
			throw new DatabaseException("Query Error" . $this->_connection->error, $this->_connection->errno, $ex);
		}
		
		if ($this->_resultSet == false)
		{
			error_log($sql);
			throw new DatabaseException("Query Error: " . $this->_connection->error, $this->_connection->errno);
		}		
		return $this->_resultSet;
	}

	public function GetRow($resultSet = null)
	{
		if ($resultSet == null)
		{
			$resultSet = $this->_resultSet;
		}
		return $resultSet->fetch_assoc();
	}
	
	public function NumRows($resultSet = null)
	{
		if ($resultSet == null)
		{
			$resultSet = $this->_resultSet;
		}
		return $resultSet->num_rows;
	}
	
	public function InsertId()
	{
		return $this->_connection->insert_id;
	}
	
	/* Private Methods */
	private function Connect()
	{
		$config = new Config();
		
		$connection = new mysqli($config->dbHost, $config->dbUser,
			$config->dbPassword, $config->dbDatabase);
		
		if (mysqli_connect_error()) {
			throw new DatabaseException("Connection error: " . mysqli_connect_error(), mysqli_connect_errno());
		}
		$this->_connection = $connection;
	}
}

?>