
//------------------------------------------------INDICE---------------------------------------
const fetch_indice = async ()=> {
    await axios.post('/server/indice.php', {day_num: DAY_NUM}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data.id !== undefined) {
            $('.cta_diamond').html(`<span>${res.data.letter.toUpperCase()}</span>`);
            disconnect()
          } else {
            showError();
          } 
        });
  }