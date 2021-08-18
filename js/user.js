function isLogged() {
  return localStorage.getItem('logged') === null ? false : true;
}

function logged(magasin_id, magasin_name, enseigne) {
  localStorage.setItem('logged', 'true');
  localStorage.setItem('magasin', magasin_id);
  localStorage.setItem('enseigne', enseigne);
  localStorage.setItem('magasin_name', magasin_name);
  let expires = new Date((Date.now()  + (510000 )) ); // (510000 + 60 * 60*1000)
  localStorage.setItem('session_expire', expires )
}

function disconnect() {
  localStorage.removeItem('logged');
}

//------------------------------------------------LOGIN---------------------------------------

const fetch_login = (e) => {
  var code = document.getElementById("code").value;
  var magasin = document.getElementById("magasin").value;
  var enseigne = document.getElementById("enseigne").value;

  if(magasin !== '') {
    try_login(magasin, code, enseigne);
  }else{
    showError();
  }
}

const try_login = async (login, pwd, enseigne) => {
  response =  await axios.post('/server/login.php', {login:login, pwd:pwd, enseigne:enseigne}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
          logged(res.data[0].id, res.data[0].name, res.data[0].enseigne)
          checkIsActiveMagasin().then(resp =>{
            if (resp[0].id !== undefined && resp[0].active > 0) {
              window.location.href = "game_indice_video.html";
            } else {
              $('.cta_diamond').addClass('inactif');
            }
          })
        } else {
          showError();
        } 
      });
  return response
}