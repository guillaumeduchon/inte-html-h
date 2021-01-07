$(document).ready(function() {

  //---------------------------------------------------------PAGE LOGIN 

  if(location.pathname === "/login.html") {
    fullfiled_magasin();
    $("#magasin").on('click', ()=>{
      hideError();
    })
  }

  //---------------------------------------------------------PAGE PLATEAU

  if(location.pathname === "/02_plateau.html") {
    isLogged() ? null : window.location.href = "login.html";
    updatePlateau();
  }

  //--------------------------------------------------------- PAGE INDICE

  if(location.pathname === "/08_indice.html") {
    isLogged() ? null : window.location.href = "login.html";
    fetch_indice();
  }

  //---------------------------------------------------------PAGE GAGNé

  if(location.pathname === "/07_gagne.html") {
    isLogged() ? null : window.location.href = "login.html";
    hasWinDay() ? $('.cta_diamond').remove() : null;;
  }

  //--------------------------------------------------------- JOUR 1

  if(location.pathname === "/10_Q1_game_drag.html") {
    if(isLogged()){
      hasLooseDay() ? goLoose() : null;
      hasWinDay() ? goWin() : null;
    }else {
      window.location.href = "login.html";
    } 
    
    //Si un tour a déja été passé
    let trial = localStorage.getItem('trial')
    if (trial) {
      if ( trial < 1) {
          $('.game_button').remove();
          onTimesUp();
          $('.trial').find('img').attr('src','img/essai_0.png')
      }
      if ( trial >= 1 ) {
        $('.trial').find('img').attr('src','img/essai_'+trial+'.png')
      }
    }
    fetch_reponse(DAY_NUM);
  }

  //--------------------------------------------------------- JOUR 2
  //--------------------------------------------------------- JOUR 3
  //--------------------------------------------------------- JOUR 4
  //--------------------------------------------------------- JOUR 5
  //--------------------------------------------------------- JOUR 6
  //--------------------------------------------------------- JOUR 7
  //--------------------------------------------------------- JOUR 8
  //--------------------------------------------------------- JOUR 9
  //--------------------------------------------------------- JOUR 10
});