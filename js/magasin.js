
//Remplir la liste des magasins (page login)
const fullfiled_magasin = async () => {
  await axios.post('/server/magasin.php', {}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    response = res.data;
    let select = $("#magasin")
    response.forEach((item, index) => {
      select.append('<option value="' + item.ident + '"' + (index < 1 ? 'selected ' : '') + '>' + item.name + '</option>');
    })
  })
}

const getMagasin = async () => {
  await axios.post('/server/magasin.php', {magasin: localStorage.getItem('magasin')}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    if (res.data.id !== undefined) {
      $('p.persomag').html(`Contactez votre chef de secteur pour connaître la réponse.<br>Merci d’avoir participé au challenge et bravo à toute l'équipe ${res.data.name} !`);
    }
  });
}

const checkIsActiveMagasin = async () => {
  return await axios.post('/server/magasin.php', {magasin: localStorage.getItem('magasin'), active:''}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    return res.data
  });
}