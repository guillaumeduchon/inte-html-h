const DATE_TAB = [
  { 1: '06/01/2021' },
  { 2: '07/01/2021' },
  { 3: '08/01/2021' },
  { 4: '09/01/2021' },
  { 5: '10/01/2021' },
  { 6: '11/01/2021' },
  { 7: '12/01/2021' },
  { 8: '13/01/2021' },
  { 9: '14/01/2021' },
  { 10: '15/01/2021' }
];
var date_today = get_date_today(new Date())
var tab_day = Object.keys(DATE_TAB.filter(obj=>( Object.values(obj) == date_today))[0])
const DAY_NUM = tab_day[0];

$(document).ready(function() {
  /*
  *------------------------------------------------------------
  *------------ROUTEUR------------------
  *------------------------------------------------------------
  *------------------------------------------------------------
  */

 /*------------------------------------------------------------RESTRICTIONS || MIDDLEWARE */


 /*------------------------------------------------------------ END RESTRICTIONS || END MIDDLEWARE */

  //PAGE LOGIN
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


  /*
  *------------------------------------------------------------
  *------------END ROUTEUR------------------
  *------------------------------------------------------------
  *------------------------------------------------------------
  */
});
