const DATE_TAB = [
  { 1: '05/01/2021' },
  { 2: '06/01/2021' },
  { 3: '07/01/2021' },
  { 4: '07/01/2021' },
  { 5: '08/01/2021' },
  { 6: '09/01/2021' },
  { 7: '10/01/2021' },
  { 8: '11/01/2021' },
  { 9: '12/01/2021' },
  { 10: '13/01/2021' }
];
var date_today = get_date_today(new Date())
var tab_day = Object.keys(DATE_TAB.filter(obj=>( Object.values(obj) == date_today))[0])
const DAY_NUM = tab_day[0];

$(document).ready(function() {
  //PAGE LOGIN
  if(location.pathname === "/Hermes_Jeu_2021/login.html") {
    fullfiled_magasin();
    $("#magasin").on('click', ()=>{
      hideError();
    })
  }

  //PAGE PLATEAU
  console.log(location.pathname);
  if(location.pathname === "/Hermes_Jeu_2021/02_plateau.html") {
    updatePlateau();
  }

  //JEU JOUR 1
  if(location.pathname === "/Hermes_Jeu_2021/10_Q1_game_drag.html") {
    //Si un tour a déja été passé
    let trial = localStorage.getItem('trial')
    if (trial) {
      if ( trial < 1) {
          $('.game_button').remove();
          onTimesUp();
          $('.trial').find('img').attr('src','img/essai_0.png')
      }
      if ( trial >= 1 ) {
        $('.trial').find('img').attr('src','img/essai_'+trial+'.png')
      }
    }
    fetch_reponse(DAY_NUM);
  }
});
//------------------------------------------------PLATEAU---------------------------------------

const updatePlateau = () => {
  let date_tab = [
    {'status':'','day_num': 1, 'day_date':'04/01/2021'},
    {'status':'','day_num': 2, 'day_date':'05/01/2021'},
    {'status':'','day_num': 3, 'day_date':'06/01/2021'},
    {'status':'','day_num': 4, 'day_date':'07/01/2021'},
    {'status':'','day_num': 5, 'day_date':'08/01/2021'}
  ];

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${DAY}/${MONTH}/${today.getFullYear()}`;

  date_tab.map((el) => {
    if(el.day_date === today_date) {
      el.highlight = 'highlight';
      el.status = 'available';
      el.img = 'img/fond_plateau_available.png';
      el.iconDisplay = 'hide';
      el.linkDisplay = '';
    }
    if(el.day_date > today_date) {
      el.highlight = '';
      el.status = 'unavailable';
      el.img = 'img/fond_plateau_unavailable.png';
      el.iconDisplay = '';
      el.linkDisplay = 'hide';
    }
    if(el.day_date < today_date) {
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


//------------------------------------------------MAGASIN---------------------------------------

//Remplir la liste des magasins (page login)
const fullfiled_magasin = async() => {
  await axios('/Hermes_Jeu_2021/server/magasin.php').then((res)=> {
    response = res.data;
    let select = $("#magasin")
    response.forEach((item, index)=> {
      select.append('<option value="'+item.ident+'"'+(index < 1 ? 'selected ':'')+'>'+item.name+'</option>');
    })
  })
}
//------------------------------------------------LOGIN---------------------------------------

const fetch_login = (e) => {
  var code = document.getElementById("code").value;
  var magasin = document.getElementById("magasin").value;
  if(magasin !== '') {
    try_login(magasin, code);
  }else{
    showError();
  }
}

var tryLogin = async (login, pwd) => {
  response =  await axios.post('/Hermes_Jeu_2021/server/login.php', {login:login, pwd:pwd}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
            window.location.href = "02_plateau.html";
        } else {
          showError();
        } 
      });
  return response
}
//------------------------------------------------QUESTION---------------------------------------

const fetch_question=()=> {
  const get_question = async () => {
    response =  await fetch('/Hermes_Jeu_2021/server/question.php').then((res)=> res.data );
    return response;
  }

  get_question().then((res)=>{
    //
  })
}

//------------------------------------------------REPONSE---------------------------------------
const check_answer = () => {
  console.log('DATA: ','zre')
  let answers_el = $('.dropzone').find('.answer_button')
  let answers_tab = []
  answers_el.each((index, el)=>{
    answers_tab.push(el.id)
  })

  fetch_reponse_valid(answers_tab)
}

const fetch_reponse = async (day_num)=> {
    await axios.post('/Hermes_Jeu_2021/server/reponse.php', {day_num: day_num}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data[0].id !== undefined) {
            res.data.map(el=>(
              $('.answers').append(`<div class="answer_button" id="${el.id}" draggable="true" class="draggable" onDragStart="dragStart(event)" onDragEnd="dragEnd( event )">${el.name}</div>`)
            ))
          } else {
            showError();
          } 
        });
}

const fetch_reponse_valid = async (answers)=> {
  await axios.post('/Hermes_Jeu_2021/server/reponse.php', {day_num: DAY_NUM, valid: true}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
          var error_answer = false;
          res.data.map(el=>{
            if(!answers.includes(String(el.id))) {
              error_answer = true;
            }
          });
          
          if(res.data.length !== answers.length) error_answer = true;

          if(error_answer) {
            console.log("ERROR !!!");
            //Do sommething when response has error
          }

        } else {
          showError();
        } 
      });
}

//------------------------------------------------INDICE---------------------------------------
// const fetchIndice = (e) => {
//   var day_num = document.getElementById("day_num").value;
  
//   response =  await axios.post('/server/indice.php', {day_num:day_num}, {
//     headers: {'Content-Type': 'application/json','mode': 'cors'}})
//       .then((res)=>{
//         if (res.data[0].id !== undefined) {
//           console.log('DATA: ','tutu')
//         } else {
//           showError();
//         } 
//       });

//   return response
// }

//---------------------------------------------Utils

function hideError() {
  $('.wrongId').attr('style','display:none');
}

function showError() {
  $('.wrongId').attr('style','display:block');
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
    if(index === 0){
      $(el).find('.statut').html(`<img class="icon" src="img/icon_cadenas.png" alt="">Disponible dans<br><strong> ${heures} H ${minutes} MIN ${secondes} S</strong>`);
    } else {
      var joursWeekEnd = (jours[date_evenement.getDay()+index] === undefined) ? jours[1] : (jours[date_evenement.getDay()+index])
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