<?php defined('SYSPATH') OR die('No direct access allowed.');


/**
* Autoload Flatfile pages
**/
Route::set('page', '<slug>', array(
		/** You can use that for restrict page **/
		// 'slug'	=> 'my_page',
		// 'slug'	=> '.*',
	))
	->defaults(array(
		'controller'	=> 'Pages',
		'action'		=> 'read',
	));
	
/**
* Default route, provide home page by default
**/
Route::set('default', '(<controller>(/<action>(/<id>)))')
	->defaults(array(
		'controller'	=> 'Pages',
		'action'		=> 'read',
		'slug'			=> 'welcome',
	));
