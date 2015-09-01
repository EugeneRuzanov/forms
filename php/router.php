<?php

require_once( 'php/functions.php' );
require_once( 'php/FileAPI.class.php' );

if ( $_POST['action'] ) {
//	_log( 'post' );
	switch ( $_POST['action'] ) {
		case 'properties-card':
			// save property with UID
			break;
		case 'properties-file':
			// save file width UID and UID property
//			_log( "POST action: {$_POST['action']}, fileGUID: {$_POST['fileGUID']}, propertyGUID: {$_POST['propertyGUID']}" );
			_log( "POST " . print_r( $_FILES, true ) );
			//todo save files
			$uploaddir = 'data/';
			$uploadfile = $uploaddir . $_POST['fileGUID'] . '.jpg';
			$move = move_uploaded_file( $_FILES['file']['tmp_name'], $uploadfile );
			_log( 'move: ' . $uploadfile );
			break;
		case 'properties-fileInfo':
			// save meta-info width UID file and UID property
			//todo save meta-info for files
			break;
	}
} else if ( $_GET['action'] ) {
	_log( 'GET' );
	switch ( $_GET['action'] ) {
		case 'properties':
			// get list properties
			break;
		case 'properties-card':
			if ( $GET['guid'] ) {
				// get property width UID
			} else {
				// create property
				include ( 'index.php' );
			}
			break;
		case 'properties-remove':
			// remove property width UID
			break;
	}
} else {
	_log( 'DEFAULT' );
	return false;
}