<?php

	class JsonWebService {

		/* Properties */
		private $_output = array();


		/* Constructor */
		function __construct() {
		}


		/* Public Methods */
		public function SetOutput ($output) {
			$this->_output = $output;
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