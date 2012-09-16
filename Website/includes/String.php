<?php

class String
{
	public static function IsNullOrEmpty($data)
	{
		return (trim($data) === "" or $data === null);
	}
}

?>