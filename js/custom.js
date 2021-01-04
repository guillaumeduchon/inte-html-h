$(document).ready(function() {
  //
  if(location.pathname === "/login.html") {
    fullfiled_magasin()
    $("#magasin").on('click', ()=>{
      hideError()
    })
  }

});

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

