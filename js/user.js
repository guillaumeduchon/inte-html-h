function isLogged() {
  return localStorage.getItem('logged') === null ? false : true;
}

function logged(magasin_id) {
  localStorage.setItem('logged', 'true');
  localStorage.setItem('magasin', magasin_id);
  let expires = new Date(Date.now() + 1586400); //1586400 ~30minutes / 16400 ~ 1minute
  expires = expires.toUTCString();
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
          logged(res.data[0].id)
          window.location.href = "/rules.html";
        } else {
          showError();
        } 
      });
  return response
}