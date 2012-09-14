<?php

class JsonWebService {

	/* Properties */
	protected $_output;


	/* Constructor */
	function __construct() {
		$this->_output = array(
			"errors" => array()
		);
	}

	/* Public Methods */
	public function SetOutput ($output) {
		$this->_output = $output;
	}

	public function AddOutput ($key, $value) {
		if (isset($this->_output[$key])) {
			if (is_array($this->_output[$key])) {
				$this->_output[$key][] = $value;
			}
		}
		else {
			$this->_output[$key] = $value;
		}
	}
		
	public function GetMethod() {	
		$requestArray = explode('/', $_SERVER['PHP_SELF']);
		return $requestArray[count($requestArray) - 1];
	}

	public function Display() {
		header ('Content-type: application/json');
		echo json_encode($this->_output);
	}
}

?>