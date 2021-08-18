<?php

require_once './inc/config.php';

define(
	'IS_AJAX',
	isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
);
if (!IS_AJAX) {
	die('Restricted access');
}

$file		= isset($_FILES['file']['tmp_name']) ? $_FILES['file']['tmp_name']  : '';
$reponses		= ['error' => ['false']];

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
		move_uploaded_file($_FILES['file']['tmp_name'], 'images/' . $img_url . '.jpg');
		$reponses[] = 'Image mise à jour';
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
