
//------------------------------------------------INDICE---------------------------------------
 //GET L'INDICES GAGNÉS PAR LE MAGASIN
const fetch_indice = async ()=> {
    await axios.post('/server/indice.php', {day_num: Number(localStorage.getItem('DAY_NUM')) }, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data.id !== undefined) {
            $('.cta_diamond').html(`<span>${res.data.letter.toUpperCase()}</span>`);
            set_indice(res.data.id);
          } else {
            showError();
          } 
        });
  }

 //SAVE L'INDICES GAGNÉS PAR LE MAGASIN
  const set_indice = async (indice_id)=> {
    await axios.post('/server/indice.php', {day_num: Number(localStorage.getItem('DAY_NUM')), indice: indice_id === 0 ? indice_id :  Number(localStorage.getItem('DAY_NUM')) , magasin: Number(localStorage.getItem('magasin')), magasin_name: localStorage.getItem('magasin_name')}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}
    }).then((res) => { 
      console.warn(`indice ${indice_id} enregistré`)
    });
  }

  //GET LES INDICES GAGNÉS PAR LE MAGASIN
  const fetch_indices = async ()=> {
    await axios.post('/server/indice_magasin.php', {magasin: localStorage.getItem('magasin')}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res) => {
            $('p').html(`Grâce aux lettres rassemblées depuis le 24 février, saurez-vous reconstituer le mot qui qualifie l’univers du nouveau parfum masculin Hermès H24 ?<br>Utilisez votre clavier pour rentrer une lettre par case.`);
            
            let indices_array= [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

            res.data.map((el) => {
              indices_array.splice(el.id, 1, el)
            })

            indices_array.map((indice, index) => {
              if (index !== 0 ) {
                let letter = indice.id !== undefined && indice.id !== 0 ? indice.letter : ' __ ';
                $('.finalgame_indice').append(`<span class="j${(index+1)}">${letter}</span>`)
              }
            }) 
        });
  }

// DISPLAY VIDEO
const fetch_movie = async () => {
  await axios.post('/server/movie.php', {date_time: GetDateToday()}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((res) => {
        if (res.data.id !== undefined) {
          $('.videoreplace').html(`<source src="video/video_game_${res.data.id}.mp4" type="video/mp4">`)
        } else {
          console.log("no day found")
        }
      });
}