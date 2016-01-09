<?php defined('SYSPATH') OR die ('No direct script access');

/**
* # Model Hero
*
* Base on Model_Page
*
* @package		FLVM
* @category		Model
* @author		Ziopod <ziopod@gmail.com>
* @copyright	(c) 2013-2014 Ziopod
* @license		http://opensource.org/licenses/MIT
**/

class Model_Hero extends Model_Page {
	

	/**
	* Get cover
	*
	* @return 	array	file informations
	**/
	public function cover()
	{
		$cover = array(
			'url' => URL::base(TRUE) . $this->_folder . 'covers/' . $this->cover,
		);

		return $cover;
	}

	/**
	* This page has cover
	*
	* @retun 	boolean
	**/
	public function has_cover()
	{
		return (bool) $this->cover();
	}
}