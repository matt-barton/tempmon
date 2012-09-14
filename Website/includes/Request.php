<?php

class Request
{
	public static function Get($key, $default=null, $from=null) {
		if ($from) {
			$from = strtoupper($from);
			if (isset(${'_'.$from}[$key])) {
				return self::Sanitize(${'_'.$from}[$key]);
			}
		}
		else {
			if (isset($_REQUEST[$key])) {
				return self::Sanitize($_REQUEST[$key]);
			}
		}
		return $default;
	}

	public static function Sanitize($data)
	{
		return ini_get('magic_quotes_gpc')
			? trim($data) : addslashes(trim($data));
	}

	public static function IsNullOrEmpty($data)
	{
		return (trim($data) === "" or $data === null);
	}
}

?>