<?php
/**
* # Master view model
*
* Please copy this file on your project and add your custom View Model POO properties and method.
*
* @package		Tanuki
* @category		View Model
* @author		Ziopod <ziopod@gmail.com>
* @copyright	(c) 2013-2014 Ziopod
* @license		http://opensource.org/licenses/MIT
**/

class View_Master extends View_Tanuki {
	
	/**
	* Set Styles
	**/
	public function styles()
	{
		return array(
			'src' => 'assets/css/main.css',
		);
	}

	/**
	* Somes defaults global data for all views
	*
	* @return	array	Global informations
	**/
	public function tanuki()
	{
		return  Kohana::$config->load('tanuki.tanuki');
	}

	/**
	* Set HTML metas list
	*
	* Try to grab metas from Flatfile, even load metas from configuration file
	*
	* @return	array
	**/
	public function metas()
	{
		// Load metas from config file, remplaced by values set in Flatfile
		$model_name = $this->model_name;
		$default_metas = Kohana::$config->load('tanuki.metas');
		$metas = array();

		if ($default_metas)
		{
			foreach ($default_metas as $name => $content)
			{
				$metas[] = array(
					'name' => $name,
					'content' => $this->$model_name->$name ? $this->$model_name->$name : $content,
				);
			}			
		}

		return $metas;
	}

	/**
	 * Set scripts
	 * 
	 * Return scripts information from Tanuki config file 
	 * 
	 * @return array
	 */
	public function scripts()
	{
		return Kohana::$config->load('tanuki.scripts');
	}



	/**
	* Set HTML title tag
	*
	* @return	string
	**/
	public function title()
	{
		// Try to load title from model
		$model_name = $this->model_name;

		if (isset($this->$model_name->title))
		{
			return $this->$model_name->title;
		}

		// Instead use global config
		return Kohana::$config->load('tanuki.tanuki.title');
	}

	/**
	* Define main navigation
	*
	* @return 	array
	**/
	public function navigation()
	{
		return array(
			array(
				'url'		=> $this->base_url() . 'cours',
				'name'		=> __('Cours'),
				'title'		=> __('Cours de cuisine et de pâtisserie'),
				'current'	=> Request::initial()->controller() === 'Pages' AND Request::initial()->param('slug') === 'cours',
			),
			array(
				'url'		=> $this->base_url() . 'informations',
				'name'		=> __('Informations'),
				'title'		=> __('À propos de FLVM'),
				'current'	=> Request::initial()->controller() === 'Pages' AND Request::initial()->param('slug') === 'informations',
			),
		);
	}	
}