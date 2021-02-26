function isLogged() {
  return localStorage.getItem('logged') === null ? false : true;
}

function logged(magasin_id, magasin_name, magasin_num) {
  localStorage.setItem('logged', 'true');
  localStorage.setItem('magasin', magasin_id);
  localStorage.setItem('magasin_name', magasin_name);
  localStorage.setItem('magasin_num', magasin_num);
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
          logged(res.data[0].id, res.data[0].name)
          checkIsActiveMagasin().then(resp =>{
            if (resp[0].id !== undefined && resp[0].active > 0 ) {
              window.location.href = "/rules.html";
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