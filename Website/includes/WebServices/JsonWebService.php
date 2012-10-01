<?php

class JsonWebService {

	/* Properties */
	protected $_output;
	protected $_parameters = array();

	/* Constructor */
	function __construct() {
		$this->parseIncomingParameters();
		$this->_output = array(
			"errors" => array()
		);
	}

	/* Public Methods */
	public function GetParameter($name) {
		return isset($this->_parameters[$name]) ? 
			$this->_parameters[$name] : null;
	}
	
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
	
	/* Private Methods */
	private function parseIncomingParameters() 
	{
		if (isset($_SERVER['QUERY_STRING']))
		{
			parse_str($_SERVER['QUERY_STRING'], $this->_parameters);
		}
		
		$body = file_get_contents("php://input");
		$content_type = false;
		if(isset($_SERVER['CONTENT_TYPE']))
		{
			$content_type = $_SERVER['CONTENT_TYPE'];
		}
		
		switch($content_type)
		{
			case "application/json":
				$body_params = json_decode($body);
				if($body_params) {
					foreach($body_params as $param_name => $param_value)
					{
						$this->_parameters[$param_name] = $param_value;
					}
				}
				break;
				
			case "application/x-www-form-urlencoded":
				parse_str($body, $postvars);
				foreach($postvars as $field => $value)
				{
					$this->_parameters[$field] = $value;
					
				}
				break;

			default:
				// unsupported content type
				break;
		}
	}
}

?>