
//Remplir la liste des magasins (page login)
const fullfiled_magasin = async () => {
  await axios.post('/server/magasin.php', {}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    response = res.data;
    let select = $("#magasin")
    let enseigne = $("#enseigne")
    response.forEach((item, index) => {
      select.append('<option value="' + item.ident + '"' + (index < 1 ? 'selected ' : '') + ' data_active=' + item.active + '>' + item.region + '</option>');
      enseigne.append('<option value="' + item.enseigne + '"' + (index < 1 ? 'selected ' : '') + ' data_active=' + item.active + '>' + item.enseigne + '</option>');
    })
  })
}

$("#magasin").on('change', (event) => {
  var active = $( "#magasin option:selected" ).attr('data_active');
  if (active === '0') {
    $('.cta_diamond').addClass('inactif');
  } else {
    $('.cta_diamond').removeClass('inactif');
  }
})
$("#enseigne").on('change', (event) => {
  var active = $( "#enseigne option:selected" ).attr('data_active');
  if (active === '0') {
    $('.cta_diamond').addClass('inactif');
  } else {
    $('.cta_diamond').removeClass('inactif');
  }
})

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