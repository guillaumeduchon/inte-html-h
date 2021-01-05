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

});

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
  let dayRaw = String(today.getUTCDate());//+ 1;
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${DAY}/${MONTH}/${today.getFullYear()}`;

  date_tab.map((el) => {
    if(el.day_date === today_date) {
      el.highlight = '';
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

const fullfiled_magasin = async() => {
  await axios('/Hermes_Jeu_2021/server/magasin.php').then((res)=> {
    response = res.data;
    let select = $("#magasin")
    response.forEach((item, index)=> {
      select.append('<option value="'+item.ident+'"'+(index < 1 ? 'selected ':'')+'>'+item.name+'</option>');
    })
  })
}

const fetchLogin = (e) => {
  var code = document.getElementById("code").value;
  var magasin = document.getElementById("magasin").value;
  if(magasin !== '') {
    tryLogin(magasin, code);
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

const fetchQuestion=()=> {
  let datas = [];

  const getQuestion = async () => {
    response =  await fetch('/Hermes_Jeu_2021/server/question.php').then((res)=> res.data );
    return response;
  }

  getQuestion().then((res)=>{
    //
  })
}

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