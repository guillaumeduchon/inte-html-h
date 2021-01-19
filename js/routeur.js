$(document).ready(function() {
  //---------------------------------------------------------PAGE LOGIN 

  if (location.pathname === "/login.html") {
    fullfiled_magasin();
    let formEmploiModal = $('#formLogin')
    formEmploiModal.submit(evt => {
        evt.preventDefault();
        var enterLogin = document.getElementById("code");
        enterLogin.onkeyup = function (e) {
          e.preventDefault();
          if (e.keyCode === 13) {
            if (location.pathname === "/login.html") {
              fetch_login()
            }
          }
        }
      });
    $("#magasin").on('click', ()=>{
      hideError();
    })
  }

  //---------------------------------------------------------PAGE REGLES GENERAL

  if (location.pathname === "/rules.html") {
    //lateau() : window.location.href = "login.html";
    
  }

  //---------------------------------------------------------PAGE PLATEAU

  if (location.pathname === "/plateau.html") {
    isLogged() ? updatePlateau() : window.location.href = "login.html";
    
  }

  //--------------------------------------------------------- PAGE GAME RULE

  if (location.pathname === "/game_rule.html") {
    isLogged() ? fetch_rules(Number(localStorage.getItem('jour'))) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE INDICE

  if (location.pathname === "/game_indice.html") {
   
    fetch_indice(Number(localStorage.getItem('jour')));
  }

  //--------------------------------------------------------- PAGE GAGNé

  if (location.pathname === "/game_win.html") {
    isLogged() ? fetch_content(Number(localStorage.getItem('jour'))) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE PERDU

  if (location.pathname === "/game_lose.html") {
    isLogged() ? fetch_content(Number(localStorage.getItem('jour'))) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- JOUR 1

  if (location.pathname === "/game_day1.html") {
    if (isLogged()) {
     

      fetch_reponse(1);
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 2

  if (location.pathname === "/game_day2.html") {
    if (isLogged()) {
    

      fetch_reponse(2);
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 3

  if (location.pathname === "/game_day3.html") {
    if (isLogged()) {
     

      fetch_reponse(3);
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 4

  if (location.pathname === "/game_day4.html") {
    if (isLogged()) {
     

      fetch_reponse(4);
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 5

  if (location.pathname === "/game_day5.html") {
    if (isLogged()) {
     

      fetch_reponse(5);
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 6

  if (location.pathname === "/game_day6.html") {
    if (isLogged()) {
     

      fetch_reponse(6);
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 7

  if (location.pathname === "/game_day7.html") {
    if (isLogged()) {
     

      fetch_reponse(7);
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 8

  if (location.pathname === "/game_day8.html") {
    if (isLogged()) {
     

      fetch_reponse(8);
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 9

  if (location.pathname === "/game_day9.html") {
    if (isLogged()) {
     

      fetch_reponse(9);
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }

  //--------------------------------------------------------- JOUR 10
  if (location.pathname === "/game_day10.html") {
    if (isLogged()) {
    
      fetch_indices(Number(localStorage.getItem('jour')));
    } else {
      clear_counter();
      window.location.href = "login.html";
    } 
  }
});

  //--------------------------------------------------------- PAGE PERDU FINAL

  if (location.pathname === "/endgame_lose.html") {
    isLogged() ? getMagasin() : window.location.href = "login.html";
  }

//----------------------------------------------------------- UTILS
function goWin() {
  $('.game_button').remove()

  let win_day = localStorage.getItem('win_day');
  if (win_day !== null) {
    let win_day_array = Object.values(JSON.parse(win_day));
    if (win_day_array.includes(String(DAY_NUM))) {
      if (location.pathname !== "/game_indice.html") {
        window.location.href = "game_win.html";
      }
    } else {
      win_day_array.push(DAY_NUM);
      localStorage.setItem('win_day', JSON.stringify(win_day_array));
    }
    
  } else{
    localStorage.setItem('win_day', JSON.stringify([DAY_NUM]));
    setTimeout(()=>{
      window.location.href = "game_win.html"
    },3000);
  }
} 

function goLoose() { setTimeout(()=>{
  window.location.href = "game_lose.html";
},5000)}

function goFinalWin() {
  $('.cta_button').remove()

  let win_day = localStorage.getItem('win_day');
  if (win_day !== null) {
    let win_day_array = Object.values(JSON.parse(win_day));
    if (win_day_array.includes(String(DAY_NUM))) {
      if (location.pathname !== "/game_indice.html") {
        window.location.href = "endgame_win.html";
      }
    } else {
      win_day_array.push(DAY_NUM);
      localStorage.setItem('win_day', JSON.stringify(win_day_array));
    }
    
  } else{
    localStorage.setItem('win_day', JSON.stringify([DAY_NUM]));
    setTimeout(()=>{
      window.location.href = "endgame_win.html"
    },3000);
  }
}

function goFinalLoose() { setTimeout(()=>{
  window.location.href = "endgame_lose.html";
},3000)}

function goLogin() { window.location.href = "login.html"}