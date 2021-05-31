//-------------------------------------------WINNERS-----------------------------------------

const set_winners = async () => {
  await axios.post('/server/winners.php', { magasin: Number(localStorage.getItem('magasin')) }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  }).then((res) => {
    console.info('Vainqueur enregistré')
  });
}

// const set_loosers = async () => {
//   await axios.post('/server/winners.php', { magasin: Number(localStorage.getItem('magasin')), user_answer_final: localStorage.getItem('user_answer_final') }, {
//     headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
//   }).then((res) => {
//     console.info('Perdant enregistré')
//   });
// }