const DATE_TAB = [
  { 1: '06/01/2021' },
  { 2: '07/01/2021' },
  { 3: '08/01/2021' },
  { 4: '09/01/2021' },
  { 5: '10/01/2021' },
  { 6: '11/01/2021' },
  { 7: '12/01/2021' },
  { 8: '13/01/2021' },
  { 9: '14/01/2021' },
  { 10: '15/01/2021' }
];
var date_today = get_date_today(new Date())
var tab_day = Object.keys(DATE_TAB.filter(obj=>( Object.values(obj) == date_today))[0])
const DAY_NUM = tab_day[0];

$(document).ready(function() {
  /*
  *------------------------------------------------------------
  *------------ROUTEUR------------------
  *------------------------------------------------------------
  *------------------------------------------------------------
  */

 /*------------------------------------------------------------RESTRICTIONS || MIDDLEWARE */


 /*------------------------------------------------------------ END RESTRICTIONS || END MIDDLEWARE */

  //PAGE LOGIN
  if(location.pathname === "/login.html") {
    fullfiled_magasin();
    $("#magasin").on('click', ()=>{
      hideError();
    })
  }

  //---------------------------------------------------------PAGE PLATEAU

  if(location.pathname === "/02_plateau.html") {
    isLogged() ? null : window.location.href = "login.html";
    updatePlateau();
  }

  //--------------------------------------------------------- PAGE INDICE

  if(location.pathname === "/08_indice.html") {
    isLogged() ? null : window.location.href = "login.html";
    fetch_indice();
  }

  //---------------------------------------------------------PAGE GAGNé

  if(location.pathname === "/07_gagne.html") {
    isLogged() ? null : window.location.href = "login.html";
    hasWinDay() ? $('.cta_diamond').remove() : null;;
  }

  //--------------------------------------------------------- JOUR 1

  if(location.pathname === "/10_Q1_game_drag.html") {
    if(isLogged()){
      hasLooseDay() ? goLoose() : null;
      hasWinDay() ? goWin() : null;
    }else {
      window.location.href = "login.html";
    } 
    
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

  //--------------------------------------------------------- JOUR 2
  //--------------------------------------------------------- JOUR 3
  //--------------------------------------------------------- JOUR 4
  //--------------------------------------------------------- JOUR 5
  //--------------------------------------------------------- JOUR 6
  //--------------------------------------------------------- JOUR 7
  //--------------------------------------------------------- JOUR 8
  //--------------------------------------------------------- JOUR 9
  //--------------------------------------------------------- JOUR 10


  /*
  *------------------------------------------------------------
  *------------END ROUTEUR------------------
  *------------------------------------------------------------
  *------------------------------------------------------------
  */
});

//------------------------------------------------PLATEAU---------------------------------------

const updatePlateau = () => {
  let date_tab = [
    {'status':'','day_num': 1, 'day_date':'06/01/2021'},
    {'status':'','day_num': 2, 'day_date':'07/01/2021'},
    {'status':'','day_num': 3, 'day_date':'08/01/2021'},
    {'status':'','day_num': 4, 'day_date':'09/01/2021'},
    {'status':'','day_num': 5, 'day_date':'10/01/2021'}
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
  await axios('/server/magasin.php').then((res)=> {
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

const try_login = async (login, pwd) => {

  response =  await axios.post('/server/login.php', {login:login, pwd:pwd}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
          logged()
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
    response =  await fetch('/server/question.php').then((res)=> res.data );
    return response;
  }

  get_question().then((res)=>{
    //
  })
}

//------------------------------------------------REPONSE---------------------------------------
const check_answer = () => {
  fetch_reponse_valid(get_user_answers());
}

const fetch_reponse = async ()=> {
    await axios.post('/server/reponse.php', {day_num: DAY_NUM}, {

      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data[0].id !== undefined) {
            res.data.map(el=>(
              $('.answers').append(`<div class="answer_button" id="answer_${el.id}" draggable="true" class="draggable" onDragStart="dragStart(event)" onDragEnd="dragEnd( event )">${el.name}</div>`)
            ))
          } else {
            showError();
          } 
        });
}

const fetch_reponse_valid = async (answers_tab)=> {
  await axios.post('/server/reponse.php', {day_num: DAY_NUM, valid: true}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((valid_resp)=>{
        //if there are at least one good answer return by api
        if (valid_resp.data[0].id !== undefined) {
          var error_answer = [];
          var e = $('.answer_button').each((index, el)=>{
            let id_el = $(el).attr('id');
            let id = getAnswerId(id_el);
            let find = false;
            Object.values(valid_resp.data).map((rep)=>{ if(rep.id === id) find = true; })
            if(!find) error_answer.push(id);
            
            return error_answer
          });

          console.log('TEST :', e)
          
          //If has error
          if(error_answer.length > 0) {
            if(localStorage.getItem('trial') === '0' && answers_tab.length < 1) goLoose();

            var nbr_answer = 0;
            $('.answer_button').each((index, el)=>{
              let id_el = $(el).attr('id'); let id = getAnswerId(id_el);
              if (error_answer.includes(id)) {
                make_result($(el))
              } else {
                nbr_answer+= 1;
                $(el).addClass('win');
              }
            });
            //if error not in user answers
            if(valid_resp.data.length === nbr_answer && error_answer.length < 1) {
              goWin();
            }
          } else {
            goWin();
          }
        } else {
          showError();
        } 
      });
}

//------------------------------------------------INDICE---------------------------------------
const fetch_indice = async ()=> {
  await axios.post('/server/indice.php', {day_num: DAY_NUM}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data.id !== undefined) {
          $('.cta_diamond').html(`<span>${res.data.letter.toUpperCase()}</span>`);
          disconnect()
        } else {
          showError();
        } 
      });
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
  if(localStorage.getItem('win_day') !== null) {
    let win_day = localStorage.getItem('win_day');
    if(win_day !== null) {
      let win_day_array = Object.values(JSON.parse(win_day));
      if(win_day_array.includes(DAY_NUM))  hasWin = true;
    }
  } 

  return hasWin;
}

function hasLooseDay() {
  let hasLoose = false;
  if(localStorage.getItem('trial') && Number(localStorage.getItem('trial')) < 1) {
    if(localStorage.getItem('win_day') === null) {
      goLoose();
    }
    let win_day = localStorage.getItem('win_day');
    if(win_day !== null) {
      let win_day_array = Object.values(JSON.parse(win_day));
      if(win_day_array[DAY_NUM] === 'false')  hasLoose = true;
    }
  }
  
  return hasLoose;
}

function isLogged(){
  let logged = localStorage.getItem('logged') === null ? false: true;
  return logged
}

function logged(){
  localStorage.setItem('logged','true');
}

function disconnect(){
  localStorage.removeItem('logged');
}

function goWin() {
  $('.game_button').remove()

  let win_day = localStorage.getItem('win_day');
  if(win_day !== null) {
    let win_day_array = Object.values(JSON.parse(win_day));
    if(win_day_array[DAY_NUM]!== undefined) {
      if(location.pathname !== "/08_indice.html") {
        window.location.href = "07_gagne.html";
      }
    } else {
      win_day_array.push(DAY_NUM);
      localStorage.setItem('win_day', JSON.stringify(win_day_array));
    }
    
  } else{
    localStorage.setItem('win_day', JSON.stringify([DAY_NUM]));
    setTimeout(()=>{
      window.location.href = "07_gagne.html"
    },1000);
  }
} 

function goLoose() { setTimeout(()=>{
  window.location.href = "07_perdu.html";
},2000)}


function getAnswerId(answer) {return Number(answer.replace('answer_',''));}

function get_user_answers(){
  let answers_el = $('.dropzone').find('.answer_button')
  let answers_tab = []
  answers_el.each((index, el)=>{
    answers_tab.push(el.id)
  })

  return answers_tab;
}

//FOR GAME ONE ADD CLASS LOOSE OR WIN AND REDICTECT EVENTUAL
function make_result(element) {
  //Si une mauvaise reponse est dans les reponses données , la mettre en rouge sinon la mettre en win 
  if(element.parent().parent().has('.dz').lenght > 0) {
    element.addClass('lose')
  } else {
    //Si on est au dernier essaie et qu'il y a une erreur
    if(localStorage.getItem('trial') === '0'){
      element.addClass('lose')
      goLoose();
    }else{
      element.addClass('win')
      localStorage.setItem('timeLeft', 24);
      localStorage.setItem('trial', Number(localStorage.getItem('trial'))-1)
      onTimesUp(true)
    }
  }
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