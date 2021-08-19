<?php

define(
	'IS_AJAX',
	isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
);
if (!IS_AJAX) {
	die('Restricted access');
}

$file		= isset($_FILES['file']['tmp_name']) ? $_FILES['file']['tmp_name']  : '';
$reponses		= ['error' => ['false']];
$folder_client	= $_POST['magasin_name'];
$folder_game	= $_POST['game_num'];
if (isset($_POST['file'])) {
	if ($_POST['file'] === 'undefined') {
		$reponses[] = 'nonewfiles';
	}
}

if ($file !== '') {
	if (0 < $_FILES['file']['error']) {
		_addError();
		$reponses[] = 'Erreur d\'upload';
	} else {
		if( !is_dir('images/'.$folder_client) ) {
			mkdir('images/'.$folder_client, 0755);
		}
		if(move_uploaded_file($_FILES['file']['tmp_name'], 'images/'.$folder_client.'/' . str_shuffle("mywaychallenge").rand(00001, 99999) . '.jpg')) {

			$reponses[] = 'Image ajouté avec succes';
		} else {

			$reponses[] = 'error when writing file';
		}
	}
}

if ($reponses['error'] = 'false') {
	unset($reponses['error']);
}

echo json_encode($reponses);

function _addError()
{
	$reponses['error'] = 'true';
}
