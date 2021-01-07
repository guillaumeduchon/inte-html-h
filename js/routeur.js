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
    isLogged() ? updatePlateau() : window.location.href = "login.html";
    
  }

  //--------------------------------------------------------- PAGE RULES

  if(location.pathname === "/05_q1_rules.html") {
    isLogged() ? fetch_rules() : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE INDICE

  if(location.pathname === "/08_indice.html") {
   
    fetch_indice();
  }

  //---------------------------------------------------------PAGE GAGNé

  if(location.pathname === "/07_gagne.html") {
    if (isLogged()){
     hasWinDay() ? $('.cta_diamond').remove() : null;
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 1

  if(location.pathname === "/10_Q1_game_drag.html") {
    if(isLogged()){
      hasLooseDay() ? goLoose() : null;
      hasWinDay() ? goWin() : null;

      fetch_reponse(DAY_NUM);
    }else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    } 
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

function goWin() {
  $('.game_button').remove()

  let win_day = localStorage.getItem('win_day');
  if(win_day !== null) {
    let win_day_array = Object.values(JSON.parse(win_day));
    if(win_day_array[DAY_NUM]!== undefined) {
      if(location.pathname !== "/08_indice.html") {
        window.location.href = "07_gagne.html";
      }
    } else {
      win_day_array.push(DAY_NUM);
      localStorage.setItem('win_day', JSON.stringify(win_day_array));
    }
    
  } else{
    localStorage.setItem('win_day', JSON.stringify([DAY_NUM]));
    setTimeout(()=>{
      window.location.href = "07_gagne.html"
    },1000);
  }
} 

function goLoose() { setTimeout(()=>{
  window.location.href = "07_perdu.html";
},2000)}

function goLogin() { window.location.href = "login.html"}