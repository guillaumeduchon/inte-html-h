
//Remplir la liste des enseigne (page login)
const fullfiled_enseigne = async () => {
  await axios.post('/server/magasin.php', {}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    response = res.data;
    let enseigne = $("#enseigne")
    response.forEach((item, index) => {
      enseigne.append('<option value="' + item.enseigne + '">' + item.enseigne + '</option>');
    })
  })
}
//Remplir la liste des magasins (page login)
const fullfiled_magasin = async () => {
  let enseigne = $("#enseigne").val();
  await axios.post('/server/magasin.php', {'enseigne': enseigne , magasin:''}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    let select = $("#magasin")
    response = res.data;
    for (const [key, region] of Object.entries(response)) {
      select.append('<option value="' + region + '">' + region + '</option>');
    
    }
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