<?php

class MonitorIdentityViewModel
{
	public $Identity;
	public $IdentityType;
	
	public function __construct(MonitorIdentity $identity = null)
	{
		if ($identity != null)
		{
			$this->Identity = $identity->GetIdentity();
			$this->IdentityType = $identity->GetType();
		}
	}
}

?>