$(document).ready(function () {
  //---------------------------------------------------------PAGE LOGIN 

  if(location.pathname === '/') {
    if(isLogged()) {
      goPlateau()
    }
  }

  if (location.pathname === "/login.html") {
    if(isLogged()) {
      goPlateau()
    } else {

      clear_counter();
      localStorage.removeItem('day_played');
      
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
      $("#magasin").on('click', () => {
        hideError();
      })
    }
  }

  //---------------------------------------------------------PAGE REGLES GENERAL

  if (location.pathname === "/rules.html") {
    if (gameStarted()) {
      goGame(Number(localStorage.getItem('jour')))
    }
  }

  //---------------------------------------------------------PAGE PLATEAU

  if (location.pathname === "/plateau.html") {
    if(isLogged()) {
      if (!gameStarted()) { 
        clear_counter();
        updatePlateau()
      } else {
        if(!gameStoped()) {
          goGame(Number(localStorage.getItem('jour')))
        }
      }
    } else {
      goLogin()
    } 
  }

  //--------------------------------------------------------- PAGE GAME RULE

  if (location.pathname === "/game_rule.html") {
    if (isLogged()) {
      if (!gameStarted()) {
        fetch_rules(Number(localStorage.getItem('jour')));
      } else {
        goGame(Number(localStorage.getItem('jour')))
      }

    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- PAGE INDICE VIDEO

  if (location.pathname === "/game_indice_video.html") {
    isLogged() ? fetch_movie(Number(localStorage.getItem('jour'))) : goLogin()
  }

  //--------------------------------------------------------- PAGE INDICE

  if (location.pathname === "/game_indice.html") {

    fetch_indice(Number(localStorage.getItem('jour')));
  }

  //--------------------------------------------------------- PAGE GAGNé

  if (location.pathname === "/game_win.html") {
    isLogged() ? fetch_content(Number(localStorage.getItem('jour'))) : goLogin()
  }

  //--------------------------------------------------------- PAGE PERDU

  if (location.pathname === "/game_lose.html") {
    isLogged() ? (fetch_content(Number(localStorage.getItem('jour'))), set_indice(0, Number(localStorage.getItem('jour')))) : goLogin()
  }

  //--------------------------------------------------------- JOUR 1

  if (location.pathname === "/game_day1.html") {
    if (isLogged()) {
      //result_day(Number(localStorage.getItem('jour')))
      startGame()
      fetch_reponse(1);
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 2

  if (location.pathname === "/game_day2.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(2);
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 3

  if (location.pathname === "/game_day3.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(3);
    } else {
      // localStorage.setItem('day_'+DAY_NUM)
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 4

  if (location.pathname === "/game_day4.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(4);
    } else {
      // localStorage.setItem('day_'+DAY_NUM)
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 5

  if (location.pathname === "/game_day5.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(5);
    } else {
      // localStorage.setItem('day_'+DAY_NUM)
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 6

  if (location.pathname === "/game_day6.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(6);
    } else {
      // localStorage.setItem('day_'+DAY_NUM)
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 7

  if (location.pathname === "/game_day7.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(7);
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 8

  if (location.pathname === "/game_day8.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(8);
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 9

  if (location.pathname === "/game_day9.html") {
    if (isLogged()) {
      startGame()
      fetch_reponse(9);
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- JOUR 10
  if (location.pathname === "/game_day10.html") {
    if (isLogged()) {
      startGame()
      fetch_indices(Number(localStorage.getItem('jour')));
    } else {
      goLogin()
    }
  }
});

//--------------------------------------------------------- PAGE PERDU FINAL

if (location.pathname === "/endgame_lose.html") {
  isLogged() ? getMagasin() : goLogin()
}

//----------------------------------------------------------- UTILS
function goWin() {
  $('.game_button').remove()
  stopGame();
  setTimeout(() => {
    window.location.href = "game_win.html"
  }, 3000);
}

function goLoose() {
  setTimeout(() => {
    stopGame();
    $('.game_button').remove()
    window.location.href = "game_lose.html";
  }, 3000)
}

function goFinalWin() {
  stopGame();
  $('.cta_button').remove()
  setTimeout(() => {
    window.location.href = "endgame_win.html"
  }, 3000);
}

function goFinalLoose() {
  stopGame();
  setTimeout(() => {
    window.location.href = "endgame_lose.html";
  }, 3000)
}

function startGame() { localStorage.setItem('day_played', 'true') }
function stopGame() { localStorage.setItem('has_played', 'true') }
function gameStarted() { return localStorage.getItem('day_played') }
function gameStoped() { return localStorage.getItem('has_played') }
function goGame(jour) { window.location.href = "/game_day"+ jour +".html" }
function goLogin() { window.location.href = "login.html" }
function goPlateau() { window.location.href = "plateau.html" }