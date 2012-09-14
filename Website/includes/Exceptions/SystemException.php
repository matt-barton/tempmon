<?php

if (method_exists(new Exception(), "getPrevious")) {
	
	/* PHP 5.3.x + */
	class SystemException extends Exception
	{
		public function __construct($message = null, $code = 0, $innerException = null)
		{
			parent::__construct($message, $code, $innerException);
		}	
	}
}
else {

	/* PHP 5.2.x and below */
	class SystemException extends Exception
	{
		private $_innerException;

		public function __construct($message = null, $code = 0, $innerException = null)
		{
			parent::__construct($message, $code, $innerException);
			
			if (!is_null($innerException))
			{
				$this->_innerException = $innerException;
			}
		}	
		
		public function getPrevious()
		{
			return $this->_innerException;	
		}
	}
}

?>