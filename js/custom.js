function check_date_is_paris() {
  var DATE_SERVER = new Date(localStorage.getItem('DATE_SERVER'))
  if (DATE_SERVER != "Invalid Date") {
    let server_date = new Date(DATE_SERVER);
    let server_date_copy = server_date;
    let client_date = new Date();

    server_date = server_date.getDay() + '/' + server_date.getUTCMonth() + '/' + server_date.getHours();
    client_date = client_date.getDay() + '/' + client_date.getUTCMonth() + '/' + client_date.getHours();

    if (localStorage.getItem('DATE_SERVER') !== null) {
      console.warn('server_date.Zzz: ', new Date(DATE_SERVER).getMinutes(), "client_TTTTdate", new Date().getMinutes())
      if (server_date !== client_date) {
        let calculDiffMinut = (((new Date(DATE_SERVER).getMinutes()) * 60) + ((Date().getMinutes()) * 60)) / 60;
        if (calculDiffMinut !== 7) {
          window.location.href = "not_good_date.html";
        }
      }
      date_first_game = new Date('2021/08/18');
      console.warn('server_date_copy: ', server_date_copy, 'date_first_game', date_first_game);

      if (server_date_copy < date_first_game) {
        window.location.href = "not_open.html";
      }
    }
  } else {
    console.warn('It seems you are on an Iphone 6 or less, date can be guarantee')
  }

}

check_date_is_paris();

/* INIT DATE HERE */
const init_date = Date.parse('2021-09-10')
const global_date_tab = Array(5).fill(0).map((_, i) => {
  let date = new Date(init_date);
  date.setDate(date.getDate() + i);

  return {
      'status': '',
      'day_num': i + 1,
      'day_date': date.toISOString().substring(0, 10).replaceAll('-', '/')
  };
});

setTimeout(() => {
  const GetDateToday = async () => {
    // var dateObj = DATE_SERVER;
    var dateObj = new Date(localStorage.getItem('DATE_SERVER'));

    var montRaw = String(dateObj.getUTCMonth() + 1);
    const MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw)

    var dayRaw = String(dateObj.getUTCDate());//+ 1
    const DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw)

    const YEAR = String(dateObj.getUTCFullYear());

    var hourRaw = String(dateObj.getHours());
    const HOUR = (hourRaw.length < 2 ? '0' + hourRaw : hourRaw)

    var minutRaw = String(dateObj.getMinutes());
    const MINUT = (minutRaw.length < 2 ? '0' + minutRaw : minutRaw)

    // if( Number(hourRaw)+13 !== dateObj_front.getHours()) {
    //   window.location.href = "wrong_hour.html"
    // }

    if (Number(HOUR) <= 9) {
      if (Number(HOUR) < 9) {
        datetoday = YEAR + '/' + MONTH + '/' + (Number(DAY) - 1)
      } else if (Number(HOUR) === 9 && Number(MINUT) < 00) {
        datetoday = YEAR + '/' + MONTH + '/' + (Number(DAY) - 1)
      } else {
        datetoday = YEAR + '/' + MONTH + '/' + DAY
      }
    } else {
      datetoday = YEAR + '/' + MONTH + '/' + DAY
    }

    return datetoday
  }

  const GetGameToday = async () => {
    await axios.post('/server/movie.php', { date_time: await GetDateToday() }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((res) => {
        if (res.data.id !== undefined) {
          localStorage.setItem('DAY_NUM', res.data.id);
          let date_actuelle = new Date();
          let heures = date_actuelle.getHours(); let minutes = date_actuelle.getMinutes()
          if (Math.abs(heures) <= 9) {
            if (Math.abs(heures) == 9 && minutes >= 00) {
              //Do nothing
            } else {
              console.log('Game number found', Number(res.data.id));
              //DAY_NUM = (Number(res.data.id) - 1)
              DAY_NUM = (Number(res.data.id))
              DAY_NUM = DAY_NUM === 0 ? 1 : DAY_NUM;
              localStorage.setItem('DAY_NUM', DAY_NUM)
            }
          }
          return localStorage.getItem('DAY_NUM');
        } else {
          localStorage.setItem('is_iphone6_or_less', 'is_iphone6_or_less')
          console.warn('No game number found (IPhone 6 or less)')
          let date_curr = new Date()
          let date_format = date_curr.toLocaleDateString("en-US").split('/')
          date_format = date_format[2] + '/' + (date_format[0].length == 1 ? '0' + date_format[0] : date_format[0]) + '/' + (date_format[1].length == 1 ? '0' + date_format[1] : date_format[1])
          console.warn('DATE_FORM', date_format)
          const date_tab = global_date_tab.map(el => el.day_date)
          let DAY_NUM = date_tab.indexOf(date_format)
          DAY_NUM = DAY_NUM + 1
          if (DAY_NUM === 0) {
            window.location.href = "not_open_today.html";
          }
          console.warn('DAY_NUM_iphone6_or_less', DAY_NUM)
          localStorage.setItem('DAY_NUM', DAY_NUM)
          let date_actuelle = new Date();
          let heures = date_actuelle.getHours(); let minutes = date_actuelle.getMinutes()
          console.warn('heures', date_actuelle.getHours(), 'minutes', date_actuelle.getMinutes())
          if (Math.abs(heures) <= 9) {
            if (Math.abs(heures) == 9 && minutes >= 00) {
              //Do nothing
            } else {
              DAY_NUM = (Number(DAY_NUM) - 1)
              localStorage.setItem('DAY_NUM', DAY_NUM)
            }
          }

        }
      });
  }

  GetGameToday();
}, 2000)

//------------------------------------------------PLATEAU---------------------------------------

const updatePlateau = () => {
  fetch_question_responses().then(function (datas) {
    if (datas.length === 5) {
      window.location.href = "endgame.html";
    }
  })

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${today.getFullYear()}/${MONTH}/${DAY}`;
  localStorage.setItem('today_date', today_date)

  var tab_day = global_date_tab.filter(obj => obj.day_date == today_date)[0];
  tab_day = tab_day.day_num;
  global_date_tab.map((el, i) => {
    if ((i + 1) > Number(localStorage.getItem('DAY_NUM'))) {
      $('.game_box:eq(' + i + ')').attr('href', '#')
    } else {
      if (i > -1) {
        if (localStorage.getItem("game_played")) {
          let sGame_played = localStorage.getItem("game_played").replace(']', '').replace('[', '');
          let aGame_played = getFormatedAnswersId(sGame_played)

          if (!RegExp(((i + 1)).toString()).test(localStorage.getItem('game_played'))) {
            if ((i + 1) > Math.max.apply(Math, aGame_played) && (i + 1) > Number(localStorage.getItem('DAY_NUM'))) {
              $('.game_box:eq(' + i + ')').attr('href', '#')
            } else {
              if (!RegExp((i + 1)).test(localStorage.getItem('game_played'))) {
                $('.game_box:eq(' + (i + 1) + ')').attr('href', '#')
              }
            }
          }

          if (RegExp(((i + 1)).toString()).test(localStorage.getItem('game_played'))) {
            if (i === 2) {
              $('.game_box:eq(' + i + ')').attr('href', '/game_end_day3.html')
              return;
            }
            if (i === 4) {
              $('.game_box:eq(' + i + ')').attr('href', '/game_end_day5.html')
              return;
            }
            $('.game_box:eq(' + i + ')').attr('href', '/game_end.html?day=' + (i + 1))
          }

        } else {
          if ((i + 1) > Number(localStorage.getItem('DAY_NUM'))) {
            $('.game_box:eq(' + i + ')').attr('href', '#')
          }
        }
      }
    }
  })

  compte_a_rebours();
}

//---------------------------------------------Utils
function getFormatedAnswersId(sGame_played) {
  let result = [];
  if (/,/.test(sGame_played)) {
    sGame_played = sGame_played.split(',');
    sGame_played.forEach((n) => (result.push(Number(n))));
  } else {
    result.push(Number(sGame_played));
  }
  return result;
}
function hideError() {
  $('.wrongId').attr('style', 'display:none');
}

function showError() {
  $('.wrongId').attr('style', 'display:block');
  setTimeout(function () {
    $('.wrongId').attr('style', 'display:none');
  }, 6000);
}

function hideConsent() {
  $('.wrongConsent').attr('style', 'display:none');
}

function showConsent() {
  $('.wrongConsent').attr('style', 'display:block');
  setTimeout(function () {
    $('.wrongConsent').attr('style', 'display:none');
  }, 6000);
}

function showWrongAnswer() {
  $('.tryagain').attr('style', 'display:block;');
}

function showWrongFinalAnswer() {
  $('p').html(`Tentez votre chance une seconde fois.`);
}

function clear_counter() {
  localStorage.removeItem('timeLeft');
  localStorage.removeItem('trial');
}

function sessionTimeOut() {
  new Date(localStorage.getItem('session_expire')) < new Date(Date.now()) ?
    (localStorage.removeItem('logged'),
      localStorage.removeItem('magasin'),
      localStorage.removeItem('has_played'),
      localStorage.removeItem('has_win'),
      localStorage.removeItem('game_played'),
      alert("Vous avez été déconnecté"),
      goLogin()) : null;
}

function compte_a_rebours() {
  sessionTimeOut();
  var date_actuelle = new Date();
  const date_evenement = new Date(date_actuelle)
  date_evenement.setDate(date_evenement.getDate() + 1)
  date_evenement.setHours(9, 00, 00);
  var total_secondes = (date_evenement - date_actuelle) / 1000;

  var heures = Math.floor((total_secondes - (0 * 60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60))) / 60);
  var secondes = Math.floor(total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));
  $('.countdown > .hour').find("strong:eq(0)").html(`${Math.abs(heures) > 24 ? (Math.abs(heures) - 24) : Math.abs(heures)} HEURES`)

  before09h00(Math.abs(heures), minutes, secondes);
  ShowGamePlayed();
  var actualisation = setTimeout("compte_a_rebours();", 1000);
}

function get_date_today(d) {
  let today = d;
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);

  return `${today.getFullYear()}/${MONTH}/${DAY}`;
}

localStorage.setItem('nbInBefore09h00', 0);

function before09h00(heures, minutes, secondes) {
  if (heures === 24 && minutes === 00 && secondes === 00) {
    localStorage.removeItem('has_played');
    localStorage.removeItem('day_played');
    localStorage.removeItem('has_win');
    //localStorage.setItem('DAY_NUM', (Number(localStorage.getItem('DAY_NUM'))+1))
    location.reload();
    GetGameToday();
    //location.reload();

  }
  if (heures >= 24) {
    localStorage.setItem('nbInBefore09h00', (Number(localStorage.getItem('nbInBefore09h00')) + 1));
    if (localStorage.getItem('nbInBefore09h00') === '1') {
      //localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')) - 1)

    }
  } else {
    cleanNbInBefore09h00();
  }
}
var plateau_has_treated = false;
var regex2 = new RegExp(/1|2|3|4|5/);
if (localStorage.getItem("game_played")) {
  var sGame_played = localStorage.getItem("game_played").replace(']', '').replace('[', '');
  var aGame_played = getFormatedAnswersId(sGame_played)
}
var show_game_played_done = false
const ShowGamePlayed = () => {
  if (!show_game_played_done) {
    if (!localStorage.getItem("game_played")) {
      fetch_question_responses().then((datas) => {
        if (datas.length > 0) {
          if (datas[0] !== undefined) {
            localStorage.setItem('game_played', JSON.stringify(datas))
            $('.game').each((i, e) => {
              if (!plateau_has_treated) {
                if (dayHasResult((i + 1))) {
                  addGameDoneClass((i + 1))
                  $('.game_box:eq(' + i + ')').attr('href', '/game_end.html?day=' + (i + 1))
                  if (!RegExp((i + 2)).test(localStorage.getItem('game_played'))) {
                    $('.game_box:eq(' + (i + 2) + ')').attr('href', '#')
                  }
                } else if ((i + 1) > Number(localStorage.getItem("DAY_NUM"))) {
                  $('.game_box:eq(' + i + ')').addClass('lock');
                  $('.title_game:eq(' + i + ')').remove();
                  $(e).prepend('<div class="title_game"><span>Challenge <div class="number">' + (i + 1) + '</div></span></div>')
                } else {
                  console.warn('NO TASK')
                }
              }
            })
            plateau_has_treated = true;
          }
        }
        if (datas.length === 0) {
          $('.game').each((i, e) => {
            if ((i + 1) > Number(localStorage.getItem('DAY_NUM')) && !plateau_has_treated) {
              $('.game_box:eq(' + i + ')').addClass('lock');
              $('.title_game:eq(' + i + ')').remove();
              $(e).prepend('<div class="title_game"><span>Challenge <div class="number">' + (i + 1) + '</div></span></div>')
            } else {
              if (!plateau_has_treated) {
                $('.game_box:eq(' + (i + 1) + ')').attr('href', '#')
              }
            }
          })
          plateau_has_treated = true;
        }
      });
    }
    else {
      if (Math.max.apply(Math, aGame_played).toString().match(regex2) < Number(localStorage.getItem("DAY_NUM"))) {
        fetch_question_responses().then((datas) => {
          if (datas.length > 0) {
            if (datas[0] !== undefined) {
              localStorage.setItem('game_played', JSON.stringify(datas))
              $('.game').each((i, e) => {
                if (dayHasResult((i + 1))) {
                  addGameDoneClass((i + 1));
                } else if ((i + 1) > Number(localStorage.getItem("DAY_NUM"))) {
                  $('.game_box:eq(' + i + ')').addClass('lock');
                  $('.title_game:eq(' + i + ')').remove();
                  $(e).prepend('<div class="title_game"><span>Challenge <div class="number">' + (i + 1) + '</div></span></div>')
                }
              })
            }
          } else {
            localStorage.removeItem('game_played');
          }
        });
      } else {
        $('.game').each((i, e) => {
          if (((i + 1) > Math.max.apply(Math, aGame_played)) || (i + 1) > Number(localStorage.getItem('DAY_NUM'))) {
            if (!plateau_has_treated) {
              $('.game_box:eq(' + i + ')').addClass('lock');
              $('.title_game:eq(' + i + ')').remove();
              addGameDoneClass(i)
              $(e).prepend('<div class="title_game"><span>Challenge <div class="number">' + (i + 1) + '</div></span></div>')
            }
          } else {
            addGameDoneClass((i + 1))
          }
        })
        plateau_has_treated = true;
      }
    }
  }
  show_game_played_done = true;
}

function toggleGameEndClass(day_num) {
  const nbr_total_game = 5;
  let last_day_answered = Math.max.apply(Math, aGame_played);
  last_day_answered = last_day_answered === -Infinity ? 1 : last_day_answered;

  if( (nbr_total_game - last_day_answered) > 1) {
    if((Number(day_num)) === (Number(localStorage.getItem('DAY_NUM')))) {
      return;
    } else {
      if ( ((Number(day_num) + 1) !== (Number(localStorage.getItem('DAY_NUM')) + 1 )) ) {
        $('.countdown').css('display', 'none')
        $('.next').css('display', 'block')
      } 
    }
  } else {
    if ((Number(localStorage.getItem('DAY_NUM')) + 1 ) === 6) {
      $('.countdown').css('display', 'none')
      $('.next').css('display', 'block')
    }
  }
}

function addGameDoneClass(i) {
  if (dayHasResult(i)) {
    $('.game_box:eq(' + (i - 1) + ')').addClass('done');
  }
}

function dayHasResult(i) {
  let re = new RegExp((i));
  return re.test(localStorage.getItem('game_played'))
}


function cleanNbInBefore09h00() {
  localStorage.removeItem('nbInBefore09h00');
}
function goLogin() { window.location.href = "index.html" }
