const DATE_TAB = [
  { 1: '07/01/2021' },
  { 2: '08/01/2021' },
  { 3: '09/01/2021' },
  { 4: '10/01/2021' },
  { 5: '11/01/2021' },
  { 6: '12/01/2021' },
  { 7: '13/01/2021' },
  { 8: '14/01/2021' },
  { 9: '15/01/2021' },
  { 10: '16/01/2021' }
];
var date_today = get_date_today(new Date())
var tab_day = Object.keys(DATE_TAB.filter(obj=>( Object.values(obj) == date_today))[0])
const DAY_NUM = tab_day[0];

//------------------------------------------------PLATEAU---------------------------------------

const updatePlateau = () => {
  let date_tab = [
    {'status':'','day_num': 1, 'day_date':'07/01/2021'},
    {'status':'','day_num': 2, 'day_date':'08/01/2021'},
    {'status':'','day_num': 3, 'day_date':'09/01/2021'},
    {'status':'','day_num': 4, 'day_date':'10/01/2021'},
    {'status':'','day_num': 5, 'day_date':'11/01/2021'},
    {'status':'','day_num': 4, 'day_date':'12/01/2021'},
    {'status':'','day_num': 6, 'day_date':'13/01/2021'},
    {'status':'','day_num': 7, 'day_date':'14/01/2021'},
    {'status':'','day_num': 8, 'day_date':'15/01/2021'},
    {'status':'','day_num': 9, 'day_date':'16/01/2021'},
    {'status':'','day_num': 10, 'day_date':'17/01/2021'},
  ];

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${DAY}/${MONTH}/${today.getFullYear()}`;

  date_tab.map((el) => {
    if (el.day_date === today_date) {
      el.highlight = 'highlight';
      el.status = 'available';
      el.img = 'img/fond_plateau_available.png';
      el.iconDisplay = 'hide';
      el.linkDisplay = '';
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

  $('.carousel_cell').each((index, el)=>{
    $(el).addClass(date_tab[index].highlight);
    $(el).addClass(date_tab[index].status);
    $('.icon').each((index, el)=>{
      $(el).addClass(date_tab[index].iconDisplay);
    })
    $('.carousel_cell-content-linkgame').each((index, el)=>{
      $(el).addClass(date_tab[index].linkDisplay);
    })
  })
  $('.bg_cell').each((index, el)=>{
    $(el).attr("src", date_tab[index].img);
  })

  $('.carousel_cell available').find('.statut').addClass('countdown');
  $('.countdown').html('Il vous reste encore<br><strong></strong><br>pour trouver l\'indice du jour');

  compte_a_rebours();
}

//---------------------------------------------Utils

function hideError() {
  $('.wrongId').attr('style','display:none');
}

function showError() {
  $('.wrongId').attr('style','display:block');
}

function hasWinDay() {
  let hasWin = false;
  if (localStorage.getItem('win_day') !== null) {
    let win_day = localStorage.getItem('win_day');
    let win_day_array = Object.values(JSON.parse(win_day));
    
    if (win_day_array.includes(DAY_NUM))  
      hasWin = true;
  } 

  return hasWin;
}

function hasLooseDay() {
  let hasLoose = false;
  if (localStorage.getItem('trial') && Number(localStorage.getItem('trial')) < 1) {
    if (localStorage.getItem('win_day') === null) {
      goLoose();
    }
    let win_day = localStorage.getItem('win_day');
    if (win_day !== null) {
      let win_day_array = Object.values(JSON.parse(win_day));
      if (win_day_array[DAY_NUM] === 'false')  hasLoose = true;
    }
  }
  
  return hasLoose;
}



function clear_counter(){
  localStorage.removeItem('timeLeft');
  localStorage.removeItem('trial');
}

function compte_a_rebours(){
  var date_actuelle = new Date();
  const date_evenement = new Date(date_actuelle)
  date_evenement.setDate(date_evenement.getDate() + 1)
  date_evenement.setHours(00, 00, 00);
  var total_secondes = (date_evenement - date_actuelle) / 1000;
  
  var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
  var heures = Math.floor((total_secondes - (0 * 60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60))) / 60);
  var secondes = Math.floor(total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

  $('.countdown').find('strong').html(`${heures} H ${minutes} MIN ${secondes} S`);
  $('.unavailable:eq(0)').find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong>${heures} H ${minutes} MIN ${secondes} S</strong>`);

  $('.expired').find('.statut').html('Challenge terminé');
  $('.available').find('.statut').addClass('countdown');
  $('.countdown').html(`Il vous reste encore<br><strong>${heures} H ${minutes} MIN ${secondes} S</strong><br>pour trouver l\'indice du jour`);
  $('.unavailable').each((index, el)=>{
    if (index === 0){
      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong> ${heures} H ${minutes} MIN ${secondes} S</strong>`);
    } else {
      //Si le prochain jours est Dimanche
      var joursWeekEnd ;
      if (jours[date_evenement.getDay()+index] === undefined) {
        //Je creer un tableau contenant uniquement les jours de lundi à  samedi
        let jours_ouvre = jours.slice(1);
        joursWeekEnd = jours_ouvre[(index -2)]
        joursWeekEnd = joursWeekEnd === "Dimanche" ?  joursWeekEnd = 'Lundi': joursWeekEnd;

      } else {
        joursWeekEnd= jours[date_evenement.getDay()+index]
      } 

      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible<br><strong>${joursWeekEnd}</strong>`);
    }
  })
  var actualisation = setTimeout("compte_a_rebours();", 1000);
}

function get_date_today(d) {
  let today = d;
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);

  return `${DAY}/${MONTH}/${today.getFullYear()}`; 
}