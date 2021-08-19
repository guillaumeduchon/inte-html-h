const isEnableMagasin = async () => {
  await checkIsActiveMagasin().then(resp => {
    if (resp[0].id !== undefined) {
      if (resp[0].active === 0 && (resp[0].done_last_game >= 1)) {
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

$(document).ready(function () {

  function checkCookie() {
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled = document.cookie.indexOf("testcookie") != -1;
    }
    return cookieEnabled || showCookieFail();
  }

  function showCookieFail() {
    window.location.href = "nocookie.html"
  }

  checkCookie();

  //---------------------------------------------------------PAGE LOGIN 
  if (location.pathname === '/') {
    cleanNbInBefore10h24();
    lastConnexion()
    if (isLogged()) {
      sessionTimeOut();
      goPlateau()
    } else {
      localStorage.clear();
    }
  }

  if (location.pathname === "/login.html") {
    cleanNbInBefore10h24();
    lastConnexion()
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
    var toto = document.referrer
    console.log('FFFFF', toto)
    //fetch_question_responses()
    lastConnexion()
    if (isLogged()) {
      isEnableMagasin()
      if (!gameStarted() || gameStoped()) {
        updatePlateau()
      } else {
        //goGame(Number(localStorage.getItem('DAY_NUM')))
      }
      // if (localStorage.getItem('has_played') !== null){
      //   setTimeout(()=>{localStorage.removeItem('logged')}, 8000)
      // } 
    } else {
      goLogin()
    }
  }

  //--------------------------------------------------------- PAGE GAME RULE

  if (location.pathname === "/game_rule.html") {
    lastConnexion()
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
    if (isLogged()) {
      var dateObj = new Date(localStorage.getItem('DATE_SERVER'));
      let today = new Date();
      let montRaw = String(today.getUTCMonth() + 1);
      let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
      let dayRaw = String(today.getUTCDate());
      let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
      var hourRaw = String(dateObj.getHours());
      const HOUR = (hourRaw.length < 2 ? '0' + hourRaw : hourRaw)
      // ( ToDo  ) ADD CONDITION IF LAST DAY IS SUNDAY
      if (Number(HOUR) < 9) {
        DAY = (Number(DAY) - 1)
      }
      let today_date = `${today.getFullYear()}/${MONTH}/${DAY}`;
      localStorage.setItem('today_date', today_date)

      fetch_movie()
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- PAGE PERDU VIDEO

  if (location.pathname === "/game_lose_video.html") {
    isLogged() ? (fetch_movie()) : goLogin();
  }

  //--------------------------------------------------------- PAGE GAGNé

  if (location.pathname === "/game_win.html") {
    if (isLogged()) {
      isEnableMagasin();
      sessionTimeOut();
      fetch_content();
      set_indice(Number(localStorage.getItem('DAY_NUM')))
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- PAGE PERDU

  // if (location.pathname === "/game_lose.html") {
  //   if (isLogged()) {
  //     isEnableMagasin();
  //     sessionTimeOut();
  //     (fetch_content(), set_indice(0))
  //   } else {
  //     goLogin();
  //   }
  // }

  //--------------------------------------------------------- JOUR 1

  if (location.pathname === "/game_day1.html") {
    if (isLogged()) {
      //isEnableMagasin();
      fetch_content(1);
      //sessionTimeOut();
      //result_day(), hasWinJs();
      startGame();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 2

  if (location.pathname === "/game_day2.html") {
    // notTheDayGame(location.pathname);

    if (isLogged()) {
      //isEnableMagasin();
      //sessionTimeOut();
      //result_day();
      //startGame();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 3

  if (location.pathname === "/game_day3.html") {
    // notTheDayGame(location.pathname);

    if (isLogged()) {
      //isEnableMagasin();
      //sessionTimeOut();
      //result_day();
      //startGame();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 4

  if (location.pathname === "/game_day4.html") {
    // notTheDayGame(location.pathname);

    if (isLogged()) {
      //isEnableMagasin();
      //sessionTimeOut();
      //result_day();
      //startGame();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- JOUR 5

  if (location.pathname === "/game_day5.html") {
    // notTheDayGame(location.pathname);

    if (isLogged()) {
      //isEnableMagasin();
      //sessionTimeOut();
      //result_day();
      //startGame();
    } else {
      goLogin();
    }
  }

  //--------------------------------------------------------- PAGE PERDU FINAL

  if (location.pathname === "/endgame_lose.html") {
    isLogged() ? (isEnableMagasin(), getMagasin()) : goLogin();
  }

  //----------------------------------------------------------- GO
  function goWin() {
    stopGame();
    $('.game_button').remove()
    setTimeout(() => {
      localStorage.setItem("has_win", 'true');
      window.location.href = "game_win.html";
    }, 3000);
  }

  function goLoose() {
    stopGame();
    localStorage.setItem("has_win", 'false');
    localStorage.removeItem('has_played');
    localStorage.removeItem('day_played');
    localStorage.removeItem('has_win');
    setTimeout(() => {
      $('.game_button').remove()
      window.location.href = "game_lose.html";
    }, 3000)
  }

  //--------------------------------------------------------- GO FINAL

  function goFinalWin() {
    set_indice(Number(localStorage.getItem('DAY_NUM')))
    set_winners();
    stopGame();
    $('.game_button').remove();
    setTimeout(() => {
      localStorage.setItem("has_win", 'true');
      window.location.href = "endgame_win.html";
    }, 3000);
  }

  function goFinalLoose() {
    set_indice(0);
    // set_loosers();
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
  function notGameToday() { window.location.href = "not_open.html" }
  function goGame(jour) { window.location.href = "/game_day" + jour + ".html" }
  function goLogin() { window.location.href = "index.html" }

  function goPlateau() { window.location.href = "plateau.html" }
  function hasWinJs() {
    if (localStorage.getItem("has_win") === 'true') {
      window.location.href = "game_win.html";
    }
    if (localStorage.getItem("has_win") === 'false') {
      window.location.href = "game_lose.html";
    }
  }
  function hasWinFinalJs() {
    if (localStorage.getItem("has_win") === 'true') {
      window.location.href = "endgame_win.html";
    }
    if (localStorage.getItem("has_win") === 'false') {
      window.location.href = "endgame_lose.html";
    }
  }

  function cleanNbInBefore10h24() {
    localStorage.removeItem('nbInBefore10h24');
  }

  function lastConnexion() {
    if (localStorage.getItem('last_connexion') == null) {
      localStorage.setItem('last_connexion', String(new Date()))
    } else {
      let t1 = new Date(localStorage.getItem('last_connexion'))
      let t2 = new Date();
      let dif = t1.getTime() - t2.getTime();

      let Seconds_from_T1_to_T2 = dif / 1000;
      let Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
      console.warn('Last connexion there are ', Seconds_Between_Dates, 'seconds')
      if (Seconds_Between_Dates > 240.000) {
        localStorage.removeItem('DATE_SERVER')
        localStorage.removeItem('DAY_NUM')
        localStorage.removeItem('day_played')
        localStorage.removeItem('has_played')
        localStorage.removeItem('game_played')
        localStorage.removeItem('has_win')
        localStorage.removeItem('logged')
        localStorage.removeItem('magasin')
        localStorage.removeItem('magasin_name')
        localStorage.removeItem('nbInBefore10h24')
        localStorage.removeItem('session_expire')
        localStorage.removeItem('timeLeft')
        localStorage.removeItem('today_date')
        localStorage.removeItem('last_connexion')
        localStorage.removeItem('logged')
        alert("Vous avez été déconnecté")
      }
      setInterval(() => { lastConnexion() }, 120000)
    }
  }
})