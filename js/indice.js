
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
const fetch_movie = async () => {
  await axios.post('/server/movie.php', {date_time: localStorage.getItem('today_date')}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res) => {
        if (res.data.id !== undefined) {
          let video_number = res.data.id;
          if(localStorage.getItem('DAY_NUM')!== String(video_number)) {
            video_number = localStorage.getItem('DAY_NUM');
          }
          console.log("video/video_game_${video_number}",${video_number} )
          $('.videoreplace').html(`<source src="video/video_game_${video_number}" type="video/mp4">`)
        } else {
          console.log("no day found")
        }
      });
}