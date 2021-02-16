function isLogged() {
  return localStorage.getItem('logged') === null ? false : true;
}

function logged(magasin_id) {
  localStorage.setItem('logged', 'true');
  localStorage.setItem('magasin', magasin_id);
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
  // var acceptGame = document.getElementById("acceptGame").checked;
  // var acceptData = document.getElementById("acceptData").checked;
  if(magasin !== '') {
    try_login(magasin, code);
    // if ((acceptGame == true) && (acceptData == true)) {
    //   try_login(magasin, code);
    // } else {
    //   showError();
    // }
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
          checkIsActiveMagasin().then(resp =>{
            if (resp.data.id !== undefined) {
              window.location.href = "/rules.html";
            } else {
              window.location.href = "/noactive.html";
            }
          })
          
        } else {
          showError();
        } 
      });
  return response
}