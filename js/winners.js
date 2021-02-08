//-------------------------------------------WINNERS-----------------------------------------

const set_winners = async ()=> {
    await axios.post('/server/winners.php', { magasin: Number(localStorage.getItem('magasin'))}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}
    }).then((res) => { 
      console.info('Vainqueur enregistré')
    });
  }