
//------------------------------------------------INDICE---------------------------------------
const fetch_indice = async ()=> {
    await axios.post('/server/indice.php', {day_num: DAY_NUM}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data.id !== undefined) {
            $('.cta_diamond').html(`<span>${res.data.letter.toUpperCase()}</span>`);
            set_indice(res.data.id)
            disconnect()
          } else {
            showError();
          } 
        });
  }

  const set_indice = async (indice_id)=> {
    await axios.post('/server/indice.php', {day_num: DAY_NUM, indice: indice_id, magasin: localStorage.getItem('magasin')}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}
    }).then((res) => { });
  }