$(document).ready(function() {
  //PAGE LOGIN
  if(location.pathname === "/login.html") {
    fullfiled_magasin()
    $("#magasin").on('click', ()=>{
      hideError()
    })
  }

  //PAGE PLATEAU
  if(location.pathname === "/02_plateau.html") {
    updatePlateau()
  }

});

const updatePlateau = () => {
let date_tab = [
  {'status':'','day_num': 1, 'day_date':'04/01/2021'},
  {'status':'','day_num': 2, 'day_date':'05/01/2021'},
  {'status':'','day_num': 3, 'day_date':'06/01/2021'}
];
const today = new Date();
const today_date = `${today.getDate()} / ${(today.getMonth() + 1)} / ${today.getFullYear()}`

date_tab.map((el) => {
  if(el.day_date === today_date) el.status = 'available'
  if(el.day_date > today_date) el.status = 'unavailable'
  if(el.day_date < today_date) el.status = 'expired'
})

  console.log('DATA: ',date_tab)
}

const fullfiled_magasin = async() => {
  await axios('/server/magasin.php').then((res)=> {
    response = res.data
    let select = $("#magasin")
    response.forEach((item, index)=> {
      select.append('<option value="'+item.ident+'"'+(index < 1 ? 'selected  disabled ':'')+'>'+item.name+'</option>')
    })
  })
}

const fetchLogin = (e) => {
  var code = document.getElementById("code").value;
  var magasin = document.getElementById("magasin").value;
  if(magasin !== '') {
    tryLogin(magasin, code)
  }else{
    showError()
  }
}

var tryLogin = async (login, pwd) => {
  response =  await axios.post('/server/login.php', {login:login, pwd:pwd}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
            window.location.href = "02_plateau.html"
        } else {
          showError()
        } 
      });
  return response
}

const fetchQuestion=()=> {
  let datas = []

  const getQuestion = async () => {
    response =  await fetch('/server/question.php').then((res)=> res.data );
    return response
  }

  getQuestion().then((res)=>{
    //
  })
}

//---------------------------------------------Utils

function hideError() {
  $('.wrongId').attr('display','none')
}

function showError() {
  $('.wrongId').attr('display','block')
}

