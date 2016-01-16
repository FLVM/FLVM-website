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
			'related'	=> array(
				array(array($this, 'load_parts'), array(':value', 'related')),
			),
			'summary' => array(
				array('Flatfile::str_to_list'),
			),
			'parts'	=> array(
				array('json_decode'),
			),
			'ical'	=> array(
				array(array($this, 'parse_ical'), array(':value')),
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

		$subdirectory = $subdirectory ? $subdirectory . '/' . $this->slug . '/' : NULL;
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
	*
	* @param	url		URL to ical
	* @return	array	Ical in array format
	**/
	public function parse_ical($url)
	{
		$ical = file_get_contents($url);
		$events = explode('BEGIN:VEVENT', $ical);
		$result = array();

		foreach ($events as $event)
		{
			if ($event)
			{
				$metas = explode("\n", $event);
				$event_metas = array();

				foreach ($metas as $meta)
				{
					$meta = explode(':', $meta);
					
					if (in_array($meta[0], array('URL;VALUE=URI', 'DTSTART;VALUE=DATE', 'DTEND;VALUE:DATE', 'DTSTAMP', 'LOCATION', 'DESCRIPTION', 'CONFIRMED', 'SUMMARY', 'DTSTART;TZID=Europe/Paris', 'DTEND;TZID=Europe/Paris')))
					{
						if (strpos($meta[0], 'DT') !== FALSE)
						{
							if (strpos($meta[0], 'DATE'))
							{
								$meta[1] = strftime('%A %e %B %Y', strtotime($meta[1])); 
							}
							else
							{
								$meta[1] = strftime('%A %e %B %Y à %R', strtotime($meta[1])); 
							}
						}
						$event_metas[strtolower($meta[0])] = $meta[1];
					}
				}

				if ($event_metas)
				{
					$result[] = $event_metas;
				}
			}
		}
		// echo debug::vars($result);
		return $result;
	}
}