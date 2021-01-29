
//------------------------------------------------INDICE---------------------------------------
 //GET L'INDICES GAGNÉS PAR LE MAGASIN
const fetch_indice = async ()=> {
    await axios.post('/server/indice.php', {day_num: Number(localStorage.getItem('DAY_NUM'))}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data.id !== undefined) {
            $('.cta_diamond').html(`<span>${res.data.letter.toUpperCase()}</span>`);
            set_indice(res.data.id)
          } else {
            showError();
          } 
        });
  }

 //SAVE L'INDICES GAGNÉS PAR LE MAGASIN
  const set_indice = async (indice_id)=> {
    await axios.post('/server/indice.php', {day_num: Number(localStorage.getItem('DAY_NUM')), indice: indice_id, magasin: Number(localStorage.getItem('magasin'))}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}
    }).then((res) => { });
  }

  //GET LES INDICES GAGNÉS PAR LE MAGASIN
  const fetch_indices = async ()=> {
    await axios.post('/server/indice_magasin.php', {magasin: localStorage.getItem('magasin')}, {
      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res) => {
            $('p').html(`Grâce aux lettres rassemblées depuis le 24 février, saurez-vous reconstituer le mot qui qualifie l’univers du nouveau parfum masculin Hermès H24 ?`);
            
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
const fetch_movie = async (jour) => {
  $('.videoreplace').html(`<source src="video/video_game_${jour}.mp4" type="video/mp4">`)
}