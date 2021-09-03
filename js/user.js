function isLogged() {
  return localStorage.getItem('logged') === null ? false : true;
}

function logged(magasin_id, magasin_name, enseigne) {
  localStorage.setItem('logged', 'true');
  localStorage.setItem('magasin', magasin_id);
  localStorage.setItem('enseigne', enseigne);
  localStorage.setItem('magasin_name', magasin_name);
  let expires = new Date((Date.now()  + (2890000 )) ); // ~1H de session
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

const try_login = async (magasin, code, enseigne) => {
  response =  await axios.post('/server/login.php', {magasin:magasin, code:code, enseigne:enseigne}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        if (res.data[0].id !== undefined) {
          logged(res.data[0].id, res.data[0].name, res.data[0].enseigne)
          if (res.data[0].has_read_video === 0) {
            window.location.href = "game_intro_video.html";
            return ;
          } 
          window.location.href = "plateau.html";
        } else {
          showError();
        } 
      });
  return response
}

const set_has_read_video = async () => {
  response =  await axios.post('/server/movie.php', {magasin_num: Number(localStorage.getItem('magasin'))}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res)=>{
        console.warn("set_has_read", res.status)
      });
  return response
}