
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