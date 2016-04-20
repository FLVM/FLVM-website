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
	* @param	string	$subdirectory	force subdirectory name
	*
	* @return	array
	**/

	public function load_parts($paths, $subdirectory = NULL)
	{
/*
Refacto :

Une méthode qui charge les fichiers plat nommées (liste de chemins relatifs vers chauqye fichier séparés par des virgules)
Une méthode qui charge tous les fichiers plats d'un répertoire donnée (liste de noms de chemins relatif vers le dossier à charger)

TODO Find_all : Mettre au point une query path = nom-de-chemin; pour permettre de charger tout les fichiers flat d'un modèle situé dans un sous dossier
Au passge envisager aussi de mettre au point une query qui permet de charger tout les fichiers de sous-dossier de manière récursives

	1. charger tous les fichiers de manière récursif (default)
	2. charger tous les fichiers de mainère non récursif; recursive = FALSE ou direct_child ou sibling (parent en commun, que les fichiers frères) (actuellement en défault (il me semble))
	3. charger tous les fichiers et les sous-fichiers à partir d'un dossier specifique (path = name/of/the/path)

	Flatfile::factory('Page')->find_all();
	Flatfile::factory('Page')->sibling->find_all();
	Flatfile::factory('Page')->path('specicifc/path')->find_all();
	// Combinaison de requêtes : 
	Flatfile::factory('Page')->path('informations')->query('publish')->sibling()->find_all(); // query('publish', '=' (default), TRUE (default))
	// Toutes les pages située dans le dossier 'information', sans recursivité dans les dossier et qui possède la méta 'publish' (avec n'importe quelle valeur autre que FALSE)
	// Attention, executer les requetes en dernier

*/
		$result = array();

		foreach (explode(',', $paths) as $path)
		{
			try
			{
				// Load file
				$file = new Model_Page($subdirectory . trim($path));
				$result[] = $file;
			}
			catch(Kohana_exception $e)
			{
				Log::instance()->add(Log::WARNING, $e->getMessage());
			}

		}

		return $result;
	}

	/**
	* Get associative array from path
	*
	* Usage : 
	* 	$result = array_merge_recursive($this->_process_path($dir_path, $file), $result);
	*
	* Résulat attendu : 
	*	array(
	*		'informations'	=> array(
	*			'teams'	=> array(
	*				'files'	=> array(
	*					Flatfile,
	*					Flatfile,
	*					Flatfile,
	*				),
	*			),
	*			'files' => array(
	*				Flatfile,
	*			),
	*		),
	*
	*
	*	)
	*
	**/
	protected function _process_path($parts, $file)
	{
		$result = array();

		$part = trim(array_shift($parts));

		if ($parts)
		{
			$result[$part] = $this->_process_path($parts, $file);
		}
		else
		{
			// Set file in last dimension
			$result['files'][] = $file;
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