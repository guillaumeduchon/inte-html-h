$(document).ready(function () {
  //---------------------------------------------------------PAGE LOGIN 
  if (location.pathname === '/') {
    cleanNbInBefore10h24();
    if (isLogged()) {
      sessionTimeOut();
      goPlateau()
    } else {
      localStorage.clear();
    }
  }

  if (location.pathname === "/login.html") {
    cleanNbInBefore10h24();
    if (isLogged()) {
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
      goGame(Number(localStorage.getItem('DAY_NUM')));
    }
  }

  //---------------------------------------------------------PAGE PLATEAU

  if (location.pathname === "/plateau.html") {
    //fetch_question_responses()
    if (isLogged()) {
      isEnableMagasin()
      if (!gameStarted() || gameStoped()) {
        clear_counter();
        updatePlateau()
      } else {
        goGame(Number(localStorage.getItem('DAY_NUM')))
      }
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- PAGE GAME RULE

  if (location.pathname === "/game_rule.html") {
    if (isLogged()) {
      isEnableMagasin()
      sessionTimeOut();
      if (!gameStarted()) {
        result_day();
        fetch_rules();
      } else {
        goGame(Number(localStorage.getItem('DAY_NUM')))
      }
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- PAGE INDICE VIDEO

  if (location.pathname === "/game_indice_video.html") {
    isLogged() ? (fetch_movie(Number(localStorage.getItem('DAY_NUM')))) : goLogin();
  }

  //--------------------------------------------------------- PAGE PERDU VIDEO

  if (location.pathname === "/game_lose_video.html") {
    isLogged() ? (fetch_movie(Number(localStorage.getItem('DAY_NUM')))) : goLogin();
  }

  //--------------------------------------------------------- PAGE INDICE

  if (location.pathname === "/game_indice.html") {
    if (isLogged()) {
      isEnableMagasin()
      sessionTimeOut();
      if (!gameStarted() || gameStoped()) {
        fetch_indice();
      } else {
        goGame(Number(localStorage.getItem('DAY_NUM')))
      }
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- PAGE GAGNé

  if (location.pathname === "/game_win.html") {
    if (isLogged()) {
      sessionTimeOut();
      fetch_content(); 
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- PAGE PERDU

  if (location.pathname === "/game_lose.html") {
    if (isLogged()) {
      sessionTimeOut();
      (fetch_content(), set_indice(0)) 
    } else {
      goLogin();
    } 
  }

  //--------------------------------------------------------- JOUR 1

  if (location.pathname === "/game_day1.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day(),hasWinJs();
      startGame();
      fetch_reponse();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 2

  if (location.pathname === "/game_day2.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse2();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 3

  if (location.pathname === "/game_day3.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse3();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 4

  if (location.pathname === "/game_day4.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse4();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 5

  if (location.pathname === "/game_day5.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse2();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 6

  if (location.pathname === "/game_day6.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse6();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 7

  if (location.pathname === "/game_day7.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse7();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 8

  if (location.pathname === "/game_day8.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse8();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 9

  if (location.pathname === "/game_day9.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_day();
      startGame();
      fetch_reponse9();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 10
  if (location.pathname === "/game_day10.html") {
    notTheDayGame(location.pathname);

    if (isLogged()) {
      sessionTimeOut();
      result_finalday();hasWinFinalJs();
      startGame();
      fetch_indices();
    } else {
      goLogin();
    }
  }
});

//--------------------------------------------------------- PAGE PERDU FINAL

if (location.pathname === "/endgame_lose.html") {
  isLogged() ? getMagasin() : goLogin();
} else

  //----------------------------------------------------------- GO
  function goWin() {
    stopGame();
    $('.game_button').remove()
    setTimeout(() => {
      localStorage.setItem("has_win",'true');
      window.location.href = "game_win.html";
    }, 3000);
  }

function goLoose() {
  stopGame();
  localStorage.setItem("has_win", 'false');
  setTimeout(() => {
    $('.game_button').remove()
    window.location.href = "game_lose.html";
  }, 3000)
}

//--------------------------------------------------------- GO FINAL

function goFinalWin() {
  set_winners();
  stopGame();
  $('.game_button').remove();
  setTimeout(() => {
    localStorage.setItem("has_win",'true');
    window.location.href = "endgame_win.html";
  }, 3000);
}

function goFinalLoose() {
  stopGame();
  setTimeout(() => {
    $('.game_button').remove()
    localStorage.setItem("has_win", 'false');
    window.location.href = "endgame_lose.html";
  }, 3000)
}

function startGame() { localStorage.setItem('day_played', 'true') }
function stopGame() { localStorage.setItem('has_played', 'true') }
function gameStarted() { return localStorage.getItem('day_played') }
function gameStoped() { return localStorage.getItem('has_played') }
function goGame(jour) { window.location.href = "/game_day" + jour + ".html" }
function goLogin() { window.location.href = "login.html" }
function goPlateau() { window.location.href = "plateau.html" }
function hasWinJs() {
  if (localStorage.getItem("has_win") === 'true') {
    window.location.href = "game_win.html";
  } 
  if(localStorage.getItem("has_win") === 'false') {
    window.location.href = "game_lose.html";
  }
}
function hasWinFinalJs() {
  if (localStorage.getItem("has_win") === 'true') {
    window.location.href = "endgame_win.html";
  } 
  if(localStorage.getItem("has_win") === 'false') {
    window.location.href = "endgame_lose.html";
  }
}

function notTheDayGame(uri) {
  if (localStorage.getItem('DAY_NUM') !== uri.replace('/game_day', '').replace('.html', '')) {
    window.location.href = "/game_day" + Number(localStorage.getItem('DAY_NUM')) + ".html";
  }
}

function cleanNbInBefore10h24 () {
  localStorage.removeItem('nbInBefore10h24');
}

const  isEnableMagasin = async () => {
  await checkIsActiveMagasin().then(resp =>{
    if (resp[0].id !== undefined) {
      console.log('DATA: ',resp[0].done_last_game)
      if(resp[0].active === 0 && (resp[0].done_last_game >= 1)) {
        window.location.href = "/already.html";
      } else if (resp[0].active === 1) {
        // OK
      } else {
        window.location.href = "/noactive.html";
      }
      
    } else {
     console.log('request failed')
    }
  })
}