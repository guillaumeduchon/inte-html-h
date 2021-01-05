$(document).ready(function() {
  //PAGE LOGIN
  if(location.pathname === "/login.html") {
    fullfiled_magasin();
    $("#magasin").on('click', ()=>{
      hideError();
    })
  }

  //PAGE PLATEAU
  if(location.pathname === "/02_plateau.html") {
    updatePlateau();
  }

});

const updatePlateau = () => {
  let date_tab = [
    {'status':'','day_num': 1, 'day_date':'04/01/2021'},
    {'status':'','day_num': 2, 'day_date':'05/01/2021'},
    {'status':'','day_num': 3, 'day_date':'06/01/2021'},
    {'status':'','day_num': 4, 'day_date':'07/01/2021'}
  ];

  let today = new Date();
  let montRaw = String(today.getUTCMonth() + 1);
  let MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw);
  let dayRaw = String(today.getUTCDate());//+ 1;
  let DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw);
  let today_date = `${DAY}/${MONTH}/${today.getFullYear()}`;

  date_tab.map((el) => {
    if(el.day_date === today_date) {el.status = 'available';}
    if(el.day_date > today_date) el.status = 'unavailable';
    if(el.day_date < today_date) el.status = 'expired';
  })

  $('.carousel_cell').each((index, el)=>{
    $(el).addClass(date_tab[index].status);
  })

  $('.carousel_cell available').find('.status').addClass('countdown');
  $('.countdown').html('Il vous reste encore<br><strong></strong><br>pour trouver l\'indice du jour');

  compte_a_rebours();
}

const fullfiled_magasin = async() => {
  await axios('/server/magasin.php').then((res)=> {
    response = res.data;
    let select = $("#magasin")
    response.forEach((item, index)=> {
      select.append('<option value="'+item.ident+'"'+(index < 1 ? 'selected  disabled ':'')+'>'+item.name+'</option>');
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
  response =  await axios.post('/server/login.php', {login:login, pwd:pwd}, {
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
    response =  await fetch('/server/question.php').then((res)=> res.data );
    return response;
  }

  getQuestion().then((res)=>{
    //
  })
}

//---------------------------------------------Utils

function hideError() {
  $('.wrongId').attr('display','none');
}

function showError() {
  $('.wrongId').attr('display','block');
}

function compte_a_rebours(){
  var date_actuelle = new Date();
  const date_evenement = new Date(date_actuelle)
  date_evenement.setDate(date_evenement.getDate() + 1)
  date_evenement.setHours(00, 00, 00);
  var total_secondes = (date_evenement - date_actuelle) / 1000;
  
  var heures = Math.floor((total_secondes - (0 * 60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60))) / 60);
  var secondes = Math.floor(total_secondes - ((0 * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

  $('.countdown').find('strong').html(`${heures} H ${minutes} MIN ${secondes} S`);
  $('.unavailable:eq(0)').find('.statut').html(`Disponible dans<br><strong> ${heures} H ${minutes} MIN ${secondes} S</strong>`);
  
  var actualisation = setTimeout("compte_a_rebours();", 1000);
}