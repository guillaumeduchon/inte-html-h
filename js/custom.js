const DATE_TAB = [
  { 1: '2021/02/24' },
  { 2: '2021/02/25' },
  { 3: '2021/02/26' },
  { 4: '2021/02/27' },
  { 5: '2021/03/01' },
  { 6: '2021/03/02' },
  { 7: '2021/03/03' },
  { 8: '2021/03/04' },
  { 9: '2021/03/05' },
  { 10: '2021/03/06' }
];
var date_today = get_date_today(new Date())
if( typeof DATE_TAB.filter(obj => (Object.values(obj) == date_today))[0]  !== "object" ) {
  window.location.href = "not_open.html"
}
var tab_day = Object.keys(DATE_TAB.filter(obj => (Object.values(obj) == date_today))[0])

if(localStorage.getItem('DAY_NUM') !== null ){
  if(Number(localStorage.getItem('DAY_NUM')) < tab_day[0])
    localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')))
}
else{
  localStorage.setItem('DAY_NUM', tab_day[0]);
}

//------------------------------------------------PLATEAU---------------------------------------

const updatePlateau = () => {
  let date_tab = [
    { 'status': '', 'day_num': 1, 'day_date': '2021/02/24' },
    { 'status': '', 'day_num': 2, 'day_date': '2021/02/25' },
    { 'status': '', 'day_num': 3, 'day_date': '2021/02/26' },
    { 'status': '', 'day_num': 4, 'day_date': '2021/02/27' },
    { 'status': '', 'day_num': 5, 'day_date': '2021/03/01' },
    { 'status': '', 'day_num': 6, 'day_date': '2021/03/02' },
    { 'status': '', 'day_num': 7, 'day_date': '2021/03/03' },
    { 'status': '', 'day_num': 8, 'day_date': '2021/03/04' },
    { 'status': '', 'day_num': 9, 'day_date': '2021/03/05' },
    { 'status': '', 'day_num': 10, 'day_date': '2021/03/06' },
  ];

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${today.getFullYear()}/${MONTH}/${DAY}`;

  var $carousel = $('.carousel_plateau').flickity();

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
  $('.countdown').html('Il vous reste encore<br><strong></strong><br>pour trouver l\'indice du jour');

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
  date_evenement.setHours(13, 24, 00);
  var total_secondes = (date_evenement - date_actuelle) / 1000;
  var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
  var heures = Math.floor((total_secondes - (0 * 60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60))) / 60);
  var secondes = Math.floor(total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

  $('.countdown').find('strong').html(`${Math.abs(heures)} H ${minutes} MIN ${secondes} S`);
  $('.unavailable:eq(0)').find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong>${heures} H ${minutes} MIN ${secondes} S</strong>`);

  $('.expired').find('.statut').html('Challenge terminé');

  $('.available').find('.statut').addClass('countdown');
  $('.countdown').html(`Il vous reste encore<br><strong>${Math.abs(heures) >= 24 ? (Math.abs(heures) - 24) : Math.abs(heures)} H ${minutes} MIN ${secondes} S</strong><br>pour trouver l\'indice du jour`);
  let tomorowSamedi = 0;
  $('.unavailable').each((index, el) => {
    if (index === 0) {
      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong> ${Math.abs(heures)} H ${minutes} MIN ${secondes} S</strong>`);
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
    localStorage.removeItem('DAY_NUM_BEFORE');
    location.reload();
  }
  if (heures >= 24 ) {
    localStorage.setItem('DAY_NUM_BEFORE', (Number(localStorage.getItem('DAY_NUM'))  -1 ) );
    localStorage.setItem('nbInBefore10h24', (Number(localStorage.getItem('nbInBefore10h24')) + 1));
    
    if (localStorage.getItem('nbInBefore10h24') === '1') {
      var $carouChange = $('.carousel_plateau').flickity();
      $carouChange.addClass('available');

      $('.carousel_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').removeClass('available');
      $('.carousel_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').addClass('unavailable');
      $('.bg_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').attr("src", 'img/fond_plateau_unavailable.png');
      $('.carousel_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').attr('aria-hidden', 'true');
      $('.icon:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').removeClass('hide');
      $('.carousel_cell-content:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').find('a').hide();
      $('.statut:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 1) + ')').removeClass('countdown');

      $('.carousel_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 2) + ')').removeClass('expired');
      $('.carousel_cell-content-linkgame:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 2) + ')').addClass('');
      $('.icon:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 2) + ')').addClass('hide');
      $('.carousel_cell-content:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 2) + ')').find('a').removeClass('hide');
      $('.bg_cell:eq(' + (Number(localStorage.getItem('DAY_NUM')) - 2) + ')').attr("src", 'img/fond_plateau_available.png');

    
      localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')) - 1)
      $carouChange.flickity('select', (Number(localStorage.getItem('DAY_NUM')) - 1));
    }
  } else {
    if (localStorage.getItem('nbInBefore10h24') && localStorage.getItem('nbInBefore10h24') !== '0') {
      localStorage.setItem('DAY_NUM', Number(localStorage.getItem('DAY_NUM')) + 1)
    }

    cleanNbInBefore10h24();
  }
}

const ShowGamePlayed = () => {
  if (!localStorage.getItem("game_played")) {
    fetch_question_responses().then((datas) => {
      if (datas.length > 0) {
        if (datas[0].id !== undefined) {
          localStorage.setItem('game_played', JSON.stringify(datas))
        }
      }
    });
  } else {
    $(document).find('.carousel_cell').each((index, elem) => {
      if (index < Number(localStorage.getItem('DAY_NUM'))) {
        JSON.parse(localStorage.getItem('game_played')).forEach((game, i) => {
          if ((index + 1) === game.id) {
            if (game.indice_id > 0) {
              $('.expired:eq(' + (game.id - 1) + ')').find('.statut').html('Challenge gagné');
            } else {
              $('.expired:eq(' + (game.id - 1) + ')').find('.statut').html('Challenge perdu');
            }
          }
        })
      }
    });
  }
}
