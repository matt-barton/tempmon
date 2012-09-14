<?php

require_once MUSTACHE;

class Template
{
	private $mustache;
	private $template;
	private $config;
	
	public function __construct($templateFilename)
	{
		$this->mustache = new Mustache_Engine(array(
			'escape' => function($value) {
				return $value;
			}));	
		$this->template = file_get_contents(TEMPLATES . $templateFilename);
		$this->config = new Config();
	}
	
	public function Display($data = null)
	{
		if ($data === null)
		{
			$data = array();
		}
		$templateData = array_merge($this->config->templateDefaults, $data);
		return $this->mustache->render($this->template, $templateData);
	}	
}

?>