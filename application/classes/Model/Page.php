<?php defined('SYSPATH') OR die ('No direct script access');

/**
* # Page Model
*
* Model for Tanuki page
*
* @package		Tanuki
* @category		Model
* @author		Ziopod <ziopod@gmail.com>
* @copyright	(c) 2013-2014 Ziopod
* @license		http://opensource.org/licenses/MIT
**/

class Model_Page extends Flatfile {

	/**
	* Apply filter on data
	**/
	public function filters()
	{
		return array(
			'excerpt' => array(
				array('Flatfile::Markdown'),
			),
			'content' => array(
				array('Flatfile::Markdown'),
			),
			'credit' => array(
				array('json_decode'),
			),
			'license' => array(
				array('json_decode'),
			),
			'related'	=> array(
				array(array($this, 'load_parts'), array(':value', 'related')),
			),
			'summary' => array(
				array('Flatfile::str_to_list'),
			),
		);
	}

	/**
	* Return specifics data
	**/
	public function url()
	{
		return URL::base(TRUE, TRUE) . $this->slug;
	}

	/**
	* Load adittionnal content part
	*
	* @param	string	$parts			part name or list of part names
	* @param	string	$subdirectory	subdirectory name
	*
	* @return	array
	**/

	public function load_parts($parts, $subdirectory = NULL)
	{

		$subdirectory = $subdirectory ? $subdirectory . '/' : NULL;
		$result = array();

		foreach (explode(',', $parts) as $part)
		{
			try
			{
				$part = new Model_Page($subdirectory . trim($part));
				$result[] = $part;
			}
			catch(Kohana_exception $e)
			{
				Log::instance()->add(Log::WARNING, $e->getMessage());
			}

		}

		return $result;
	}

	public function has_related()
	{
		return (bool) $this->related;
	}

}