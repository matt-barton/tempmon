<?php

class DatabaseException extends SystemException
{
	public function __construct($message = null, $code = 0, $innerException = null)
	{
		parent::__construct($message, $code, $innerException);
	}
}

?>