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
			'summary' => array(
				array('Flatfile::str_to_list'),
			),
			// Contenu en relation, placé directement dans un sous dossier portant le nom de la page
			'related'	=> array(
				array(array($this, 'load_parts'), array(':value')),
			),
			// 'ical'	=> array(
			// 	array(array($this, 'parse_ical'), array(':value')),
			// ),
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
	* Load adittionnal content part by name
	*
	* @param	string	$parts			part name or list of part names
	* @param	string	$subdirectory	subdirectory name
	*
	* @return	array
	**/

	public function load_parts($parts, $subdirectory = NULL)
	{

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

	/**
	* This Flatfile has related content ?
	*
	* @return	bool
	**/
	public function has_related()
	{
		return (bool) $this->related;
	}

	/**
	* Ical parser
	*
	* Note : 
	* https://www.googleapis.com/calendar/v3/calendars/assoflvm@gmail.com
	* https://www.googleapis.com/calendar/v3/calendars/09c6d68cl7qs5fjtlg938orn1k@group.calendar.google.com
	* https://calendar.google.com/calendar/ical/assoflvm%40gmail.com/public/basic.ics
	*
	* @param	url		URL to ical
	* @return	array	Ical in array format
	**/
	public function parse_ical($url)
	{
		$ical = new ICal($url);
		$events = $ical->events();

		$limit = 8;
		$result = array();

		foreach ($events as $event)
		{
			if ( ! $limit--)
				break;

			// $result[] = $event;
			$result[] = array(
				'DTSTART' =>  strftime('%A %e %B %Y à %Hh%M', strtotime($event['DTSTART'])),
				'LOCATION'	=> $event['LOCATION'],
				'SUMMARY'	=> $event['SUMMARY'],
			);

		}

		return $result;
	}
}