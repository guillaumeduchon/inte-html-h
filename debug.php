<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Document sans nom</title>
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<link rel="manifest" href="site.webmanifest">
<style>
	html, body {
		font-size: 14px;
		font-family: Arial,sans-serif;
		margin: 20px;
	}
	#cta{
		width: auto;
		background-color: cadetblue;
		padding: 10px 20px;
		border-radius: 10px;
		text-align: center;
		color: #FFF;
		margin-top: 20px;
	} 
	#cta a {
		color: #FFF;
		text-decoration: none;
	} 
	</style>
</head>

<body>
	<div id="result"></div>
	<div id="infoposition"></div>
	<script>
	function maPosition(position) {
	  var infopos = "Position déterminée :\n";
	  infopos += "Latitude : "+position.coords.latitude +"\n";
	  infopos += "Longitude: "+position.coords.longitude+"\n";
	  infopos += "Altitude : "+position.coords.altitude +"\n";
	  document.getElementById("infoposition").innerHTML = infopos;
	}
	if (!navigator.cookieEnabled) {
		document.getElementById("result").innerHTML = '<b>Cookies :</b> <span style="color:red">bloqués</span>';
	}
	else {
    	document.getElementById("result").innerHTML = '<b>Cookies :</b> <span style="color:green">OK</span>';
	}

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(maPosition);
	} 
	else {
  		document.write("Localisation : impossible");
	}	
document.write("<b>Support :</b> " + navigator.platform +"<br>");
document.write("<b>Navigateur :</b> " + navigator.userAgent +"<br>");
let date1 = Date();

document.write("<b>Date navigateur :</b> " + date1 +"<br>");
	</script>
<?php echo "<b>Date serveur :</b> ".date("D M j G:i:s T Y"); ?>
	<div id="cta"></div>
	<script>
	document.getElementById("cta").innerHTML = "<a href='mailto:a.franceschini@agencesurf.com?subject=InfoSupport&body="+ document.getElementById("result").innerHTML +"%0ASupports%20:%20"+ navigator.platform +"%0ANavigateur%20:%20"+ navigator.userAgent +"%0ADate%20navigateur%20:%20"+ date1 +"%0ADate%20serveur%20:%20<?= date("D M j G:i:s T Y")?>'>Envoyer le rapport</a>";
	</script>
</body>
</html>
