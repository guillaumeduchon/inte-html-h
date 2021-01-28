//-------------------------------------------WINNERS-----------------------------------------

const set_winners = async (winning_id)=> {
    await axios.post('/server/winners.php', {day_num: Number(localStorage.getItem('DAY_NUM')), winning: winning_id, magasin: Number(localStorage.getItem('magasin'))}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}
    }).then((res) => { });
  }