$(document).ready(function () {
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
    $("#magasin").on('click', () => {
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
    isLogged() ? (result_day(), fetch_rules()) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE INDICE VIDEO

  if (location.pathname === "/game_indice_video.html") {
    isLogged() ? fetch_movie(DAY_NUM) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE INDICE

  if (location.pathname === "/game_indice.html") {

    fetch_indice();
  }

  //--------------------------------------------------------- PAGE GAGNé

  if (location.pathname === "/game_win.html") {
    isLogged() ? fetch_content() : window.location.href = "login.html";
  }

  //--------------------------------------------------------- PAGE PERDU

  if (location.pathname === "/game_lose.html") {
    isLogged() ? (fetch_content(), set_indice(0)) : window.location.href = "login.html";
  }

  //--------------------------------------------------------- JOUR 1

  if (location.pathname === "/game_day1.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse();
    } else {
      clear_counter();
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 2

  if (location.pathname === "/game_day2.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse2();
    } else {
      clear_counter();
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 3

  if (location.pathname === "/game_day3.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse3();
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 4

  if (location.pathname === "/game_day4.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse4();
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 5

  if (location.pathname === "/game_day5.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse2();
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 6

  if (location.pathname === "/game_day6.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse6();
    } else {
      clear_counter();
      // localStorage.setItem('day_'+DAY_NUM)
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 7

  if (location.pathname === "/game_day7.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse7();
    } else {
      clear_counter();
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 8

  if (location.pathname === "/game_day8.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse8(DAY_NUM);
    } else {
      clear_counter();
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 9

  if (location.pathname === "/game_day9.html") {
    if (isLogged()) {
      result_day()

      fetch_reponse9();
    } else {
      clear_counter();
      window.location.href = "login.html";
    }
  }

  //--------------------------------------------------------- JOUR 10
  if (location.pathname === "/game_day10.html") {
    if (isLogged()) {
      result_day()

      fetch_indices();
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

//----------------------------------------------------------- GO
function goWin() {
  $('.game_button').remove()
  localStorage.setItem('day_played', 'true');
  setTimeout(() => {
    window.location.href = "game_win.html"
  }, 3000);
}

function goLoose() {
  setTimeout(() => {
    $('.game_button').remove()
    localStorage.setItem('day_played', 'true');
    window.location.href = "game_lose.html";
  }, 3000)
}

//--------------------------------------------------------- GO FINAL

function goFinalWin() {
  $('.cta_button').remove()
  localStorage.setItem('day_played', 'true');
  setTimeout(() => {
    window.location.href = "endgame_win.html"
  }, 3000);
}

function goFinalLoose() {
  localStorage.setItem('day_played', 'true');
  setTimeout(() => {
    window.location.href = "endgame_lose.html";
  }, 3000)
}

function goLogin() { window.location.href = "login.html" }
function goPlateau() { window.location.href = "plateau.html" }