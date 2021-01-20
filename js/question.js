//------------------------------------------------QUESTION---------------------------------------
const fetch_rules = async (jour) => {
  await axios.post('/server/question.php', { day_num: jour, type: 'rules' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((resp) => {
      //if there are at least one good answer return by api
      // console.log(resp);
      if (resp.data.jour !== undefined && resp.data.rules !== undefined && resp.data.type_game !== undefined) {
        $('.quizz').find('strong').html(`Jour ${resp.data.jour}`)
        $('.rulegame').html(`<p>${resp.data.rules}</p>`)
        if (resp.data.type_game === 'drag') {
          $('.explanation').html(`<img src="img/icon_drag_drop.png" alt="Drag and drop"><p>Glisser &amp; déposer<br>Glissez dans la zone dédiée</p>`)
        } else if (resp.data.type_game === 'quiz1') {
          $('.explanation').html(`<img src="img/icon_quiz.png" alt="Quiz"><p>Quiz<br>Sélectionnez les bonnes réponses</p>`)
        } else if (resp.data.type_game === 'quiz2') {
          $('.explanation').html(`<img src="img/icon_quiz.png" alt="Quiz"><p>Quiz<br>Sélectionnez la bonne réponse</p>`)
        } else if (resp.data.type_game === 'quiz3') {
          $('.explanation').html(`<img src="img/icon_quiz.png" alt="Quiz"><p>Quiz<br>Trouvez la bonne réponse</p>`)
        } else if (resp.data.type_game === 'swipe') {
          $('.explanation').html(`<img src="img/icon_swipe.png" alt="Swipe"><p>Swipe<br>Choisissez en faisant défiler les images</p>`)
        }
        $('.cta_diamond').find('a').attr('href', '/game_day' + resp.data.jour + '.html')
      }
    })
}

const fetch_content = async (jour) => {
  await axios.post('/server/question.php', { day_num: jour, type: 'content' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((resp) => {
      //if there are at least one good answer return by api
      // console.log(resp);
      if (resp.data.content !== undefined) {
        $('.explicgame').html(`<p>${resp.data.content}</p>`)
      }
    });
}

const result_day = async (jour) => {
  await axios.post('/server/indice_magasin.php', { day_num: jour}, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((resp) => {
      if (resp.data.indice_id !== undefined) {
        if(resp.data.indice_id !== 0) {
          window.location.href = '/game_win.html'
        } else {
          window.location.href = '/game_lose.html'
        }
      }
    });
}