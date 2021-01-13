
//Remplir la liste des magasins (page login)
const fullfiled_magasin = async () => {
  await axios('/server/magasin.php').then((res) => {
    response = res.data;
    let select = $("#magasin")
    response.forEach((item, index) => {
      select.append('<option value="' + item.ident + '"' + (index < 1 ? 'selected ' : '') + '>' + item.name + '</option>');
    })
  })
}

function getMagasin() {
  await axios.post('/server/magasin.php', {magasin: localStorage.getItem('magasin')}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    if (res.data.id !== undefined) {
      $('.finalgame_finalscreen_contain > p').html(`Contactez votre chef de secteur pour connaître la réponse.<br>Merci d’avoir participé au challenge et bravo à toute équipe ${res.data.name}!`);
    }
  });
}