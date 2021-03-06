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

class View_Pages_Home extends View_Master {

	/**
	* Load some heroes
	*
	* @return 	object 	return the first hero
	**/
	public function heroes()
	{
		return Flatfile::factory('hero')->find();
	}
}