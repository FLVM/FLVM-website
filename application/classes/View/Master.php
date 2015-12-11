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
	* Somes defaults globales data for all views
	*
	* @return	array	Global informations
	**/
	public function tanuki()
	{
		return array(
			'title' 		=> "Faites le vous même",
			'description'	=> "Des cours de cuisine et pâtisseries et bien plus encore.",
			'author'		=> array(
				'name'		=> "FLVM",
				'email'		=> "contact@flvm.fr",
				'url'		=> "http://flvm.fr",
			),
			'license'		=> array(
				'name'		=> 'MIT',
				'url'		=> 'http://opensource.org/licenses/mit-license.php',
			),
		);
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
				'url'		=> $this->base_url(),
				'name'		=> __('Home'),
				'title'		=> __('Go to Home'),
				'current'	=> Request::initial()->controller() === 'App' AND Request::initial()->action() === 'home',
			),
			array(
				'url'		=> $this->base_url() . 'informations',
				'name'		=> __('Informations'),
				'title'		=> __('À propos de FLVM'),
				'current'	=> Request::initial()->controller() === 'App' AND Request::initial()->param('slug') === 'about',
			),
		);
	}	
}