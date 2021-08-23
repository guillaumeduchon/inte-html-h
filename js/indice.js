
//------------------------------------------------INDICE---------------------------------------

 //SAVE L'INDICES GAGNÉS PAR LE MAGASIN
  // const set_indice = async (indice_id)=> {
  //   await axios.post('/server/indice.php', {day_num: Number(localStorage.getItem('DAY_NUM')), indice: indice_id === 0 ? indice_id :  Number(localStorage.getItem('DAY_NUM')) , magasin: Number(localStorage.getItem('magasin')), magasin_name: localStorage.getItem('magasin_name')}, {
  //     headers: {'Content-Type': 'application/json','mode': 'cors'}
  //   }).then((res) => { 
  //     console.warn(`indice ${indice_id} enregistré`)
  //   });
  // }

// DISPLAY VIDEO
const fetch_movie =  (number) => {
  $('.videoreplace').html(`<source src="video/video_game_${number}.mp4" type="video/mp4">`)   
  $('.videoreplace').data('number' , number)
}
const fetch_movie_intro = () => {
  $('.videoreplace').html(`<source src="video/video_game_intro.mp4" type="video/mp4">`)   
}

