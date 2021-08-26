
function check_date_is_paris() {
  var DATE_SERVER = new Date(localStorage.getItem('DATE_SERVER'))
  if(DATE_SERVER != "Invalid Date") {
    let server_date = new Date(DATE_SERVER);
    let server_date_copy = server_date;
    let client_date = new Date();
  
    server_date = server_date.getDay() + '/' + server_date.getUTCMonth() + '/' + server_date.getHours();
    client_date = client_date.getDay() + '/' + client_date.getUTCMonth() + '/' + client_date.getHours();
  
    if(localStorage.getItem('DATE_SERVER') !== null) {
      console.warn('server_date: ', server_date, "client_date", client_date)
      if (server_date !== client_date) {
        console.warn('server_date: ', server_date, "client_date", client_date)
        window.location.href = "not_good_date.html";
      }
      date_first_game = new Date('2021/08/18');
      console.warn('server_date_copy: ',server_date_copy, 'date_first_game', date_first_game );
    
      if(server_date_copy < date_first_game) {
        window.location.href = "not_open.html";
      }
    }
  } else {
    console.warn('It seems you are on an Iphone 6 or less, date can be guarantee')
  }

}

check_date_is_paris();

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
          let heures =  date_actuelle.getHours(); let minutes= date_actuelle.getMinutes()
          console.log('heures', date_actuelle.getHours(),'minutes', date_actuelle.getMinutes(), "Math.abs(heures) => ", Math.abs(heures) )
          if(Math.abs(heures) <= 9) {
              if(Math.abs(heures) == 9 && minutes >=00 ) {
                //Do nothing
              } else {
                console.log('Game number found')
                DAY_NUM = (Number(res.data.id)-1)
                localStorage.setItem('DAY_NUM', DAY_NUM)
              }
          }
          return  localStorage.getItem('DAY_NUM');
        } else {
          localStorage.setItem('is_iphone6_or_less','is_iphone6_or_less')
          console.warn('No game number found (IPhone 6 or less)')
          let date_curr = new Date()
          let date_format = date_curr.toLocaleDateString("en-US").split('/')
          date_format = date_format[2]+'/'+ (date_format[0].length == 1 ? '0'+date_format[0] : date_format[0])+'/'+(date_format[1].length == 1 ? '0'+date_format[1]:date_format[1])
          console.warn('DATE_FORM',date_format)
          let date_tab = [
            "2021/08/23",
            "2021/08/24",
            "2021/08/25",
            "2021/08/26",
            "2021/08/27",
          ];
          let DAY_NUM = date_tab.indexOf(date_format)
          DAY_NUM = DAY_NUM+1
          if(DAY_NUM === 0) {
            window.location.href = "not_open_today.html";
          }
          console.warn('DAY_NUM_iphone6_or_less', DAY_NUM)
          localStorage.setItem('DAY_NUM', DAY_NUM)
          let date_actuelle = new Date();
          let heures =  date_actuelle.getHours(); let minutes= date_actuelle.getMinutes()
          console.warn('heures', date_actuelle.getHours(),'minutes', date_actuelle.getMinutes())
          if(Math.abs(heures) <= 9) {
              if(Math.abs(heures) == 9 && minutes >=00 ) {
                //Do nothing
              } else {
                DAY_NUM = (Number(DAY_NUM)-1)
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
  let date_tab = [
    { 'status': '', 'day_num': 1, 'day_date': '2021/08/23' },
    { 'status': '', 'day_num': 2, 'day_date': '2021/08/24' },
    { 'status': '', 'day_num': 3, 'day_date': '2021/08/25' },
    { 'status': '', 'day_num': 4, 'day_date': '2021/08/26' },
    { 'status': '', 'day_num': 5, 'day_date': '2021/08/27' },
  ];

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${today.getFullYear()}/${MONTH}/${DAY}`;
  localStorage.setItem('today_date', today_date)

  var $carousel = $('.carousel_plateau').flickity();
  var tab_day = date_tab.filter(obj => obj.day_date == today_date)[0];
  tab_day = tab_day.day_num;
  date_tab.map((el) => {
    if (el.day_date === today_date) {
      el.highlight = '';
      var indexSlide = tab_day - 1;
      $carousel.flickity('select', indexSlide);
      if (localStorage.getItem("has_win") === 'false') {
        el.status = 'expired';
        el.img = 'img/fond_plateau_expired.png';
        el.iconDisplay = 'hide';
        el.linkDisplay = 'hide';
      } else {
        el.status = 'available';
        el.img = 'img/fond_plateau_available_v3.png';
        el.iconDisplay = 'hide';
        el.linkDisplay = '';
      }
    }
    if (el.day_date > today_date) {
      el.highlight = '';
      el.status = 'unavailable';
      el.img = 'img/fond_plateau_unavailable.png';
      el.iconDisplay = '';
      el.linkDisplay = 'hide';
    }
    if (el.day_date < today_date) {
      el.highlight = '';
      el.status = 'expired';
      el.img = 'img/fond_plateau_expired.png';
      el.iconDisplay = 'hide';
      el.linkDisplay = 'hide';
    }
  })

  $('.carousel_cell').each((index, el) => {
    $(el).addClass(date_tab[index].highlight);
    $(el).addClass(date_tab[index].status);
    // var index = $(date_tab[index]).index();
    $('.icon').each((index, el) => {
      $(el).addClass(date_tab[index].iconDisplay);
    })
    $('.carousel_cell-content-linkgame').each((index, el) => {
      $(el).addClass(date_tab[index].linkDisplay);
    })
  })
  $('.bg_cell').each((index, el) => {
    $(el).attr("src", date_tab[index].img);
  })

  $('.carousel_cell available').find('.statut').addClass('countdown');
  $('.carousel_cell:not(.expired, .unavailable)').find('.countdown').html('Il vous reste encore<br><strong></strong><br>pour trouver l\'indice du jour');

  compte_a_rebours();
}

//---------------------------------------------Utils

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
  var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
  var heures = Math.floor((total_secondes - (0 * 60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60))) / 60);
  var secondes = Math.floor(total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));
  $('.countdown > .hour').find("strong:eq(0)").html(`${Math.abs(heures)} HEURES`)
  //$('.countdown').find('strong').html(`${Math.abs(heures)} H ${minutes} MIN ${secondes} S`);
  $('.unavailable:eq(0)').find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong>${Math.abs(heures) >= 24 ? (Math.abs(heures) - 24) : Math.abs(heures)} H ${minutes} MIN ${secondes} S</strong>`);

  $('.expired').find('.statut').html('Challenge terminé');

  $('.available').find('.statut').addClass('countdown');
  $('.carousel_cell:not(.expired, .unavailable)').find('.countdown').html(`Il vous reste encore<br><strong>${Math.abs(heures) >= 24 ? (Math.abs(heures) - 24) : Math.abs(heures)} H ${minutes} MIN ${secondes} S</strong><br>pour trouver l\'indice du jour`);
  let tomorowSamedi = 0;
  $('.unavailable').each((index, el) => {
    if (index === 0) {
      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong> ${Math.abs(heures) >= 24 ? (Math.abs(heures) - 24) : Math.abs(heures)} H ${minutes} MIN ${secondes} S</strong>`);
    } else {
      var joursSuivant;
      //Si le prochain jours est Dimanche
      if (jours[date_evenement.getDay() + index] === undefined) {
        //Je creer un tableau contenant uniquement les jours de lundi à  samedi
        let jours_ouvre = jours.slice(1);

        if (index === 1 && date_evenement.getDay() === 6) {
          joursSuivant = jours_ouvre[0];
          tomorowSamedi = 1;
        } else {
          if (index > 7) { index = 2 + index - 8 }
          joursSuivant = jours_ouvre[(index - 2 + tomorowSamedi)];
        }
      } else {
        joursSuivant = jours[date_evenement.getDay() + index]
      }

      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible<br><strong>${joursSuivant}</strong>`);
    }
  })

  before10h24(Math.abs(heures), minutes, secondes);
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

localStorage.setItem('nbInBefore10h24', 0);

function before10h24(heures, minutes, secondes) {
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
    localStorage.setItem('nbInBefore10h24', (Number(localStorage.getItem('nbInBefore10h24')) + 1));

    if (localStorage.getItem('nbInBefore10h24') === '1') {
      var $carouChange = $('.carousel_plateau').flickity();
      $carouChange.addClass('available');

      $('.carousel_cell:eq(' + localStorage.getItem('DAY_NUM') + ')').removeClass('available');
      $('.carousel_cell:eq(' + localStorage.getItem('DAY_NUM') + ')').addClass('unavailable');
      $('.bg_cell:eq(' + localStorage.getItem('DAY_NUM') + ')').attr("src", 'img/fond_plateau_unavailable.png');
      $('.carousel_cell:eq(' + localStorage.getItem('DAY_NUM') + ')').attr('aria-hidden', 'true');
      $('.icon:eq(' + localStorage.getItem('DAY_NUM') + ')').removeClass('hide');
      $('.carousel_cell-content:eq(' + localStorage.getItem('DAY_NUM') + ')').find('a').hide();
      $('.statut:eq(' + localStorage.getItem('DAY_NUM') + ')').removeClass('countdown');

      $('.carousel_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').removeClass('expired');
      $('.carousel_cell-content-linkgame:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').addClass('');
      $('.icon:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').addClass('hide');
      $('.carousel_cell-content:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').find('a').removeClass('hide');
      $('.bg_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').attr("src", 'img/fond_plateau_available.png');


      localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')) - 1)
      $carouChange.flickity('select', localStorage.getItem('DAY_NUM'));
    }
  } else {
    // if (localStorage.getItem('nbInBefore10h24') && localStorage.getItem('nbInBefore10h24') !== '0') {
    //   localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')) + 1)
    // }

    cleanNbInBefore10h24();
  }
}

const ShowGamePlayed = () => {
  let regex2 = new RegExp(localStorage.getItem("DAY_NUM"));
  if (!localStorage.getItem("game_played") || regex2.test(localStorage.getItem("game_played")) == false ) {
    //if(localStorage.getItem('is_iphone6_or_less')==null) {
      fetch_question_responses().then((datas) => {
        if (datas.length > 0) {
          if (datas[0].id !== undefined) {
            localStorage.setItem('game_played', JSON.stringify(datas))
          }
        }
      });
    //}
  }
   else {
    $(document).find('.carousel_cell').each((index, elem) => {
      if (index < Number(localStorage.getItem('DAY_NUM'))) {
        JSON.parse(localStorage.getItem('game_played')).forEach((game, i) => {
          if ((index + 1) === game.id) {
            if (game.question_id > 0) {
              $('.carousel_cell:eq(' + (game.id - 1) + ')').find('.statut').html('Challenge gagné');
            } else {
              $('.carousel_cell:eq(' + (game.id - 1) + ')').find('.statut').html('Challenge perdu');
            }
          }
        })
      }
    });
  }
}

function cleanNbInBefore10h24() {
  localStorage.removeItem('nbInBefore10h24');
}


