//------------------------------------------------QUESTION---------------------------------------
const fetch_rules= async()=> {
    response =  await axios.post('/server/question.php', {day_num: DAY_NUM, type: ('rules','type_game')}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
    .then((resp)=>{
        //if there are at least one good answer return by api
        if (resp.data[0].id !== undefined) {
            $('.rulegame').html(`<p>${resp.data.rules}</p>`)
            if (resp.data[0].type_game === 'drag') {
                $('.explanation').html(`<img src="img/icon_drag.png" alt="Drag and drop"><p>Glisser &amp; déposer<br>Glissez dans la zone dédiée</p>`)
            } else if (resp.data[0].type_game === 'quiz') {
                $('.explanation').html(`<img src="img/icon_quiz.png" alt="Quiz"><p>Quiz<br>Sélectionnez les bonnes réponses</p>`)
            } else if (resp.data[0].type_game === 'swipe') {
                $('.explanation').html(`<img src="img/icon_swipe.png" alt="Swipe"><p>Swipe<br>Choisissez en faisant défiler les images</p>`)
            }
        }
    })
}

const fetch_content= async()=> {
    response =  await axios.post('/server/question.php', {day_num: DAY_NUM, type: 'content'}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
    .then((resp)=>{
        //if there are at least one good answer return by api
        if (resp.data[0].id !== undefined) {
            $('.explicgame').html(`<p>${resp.data.content}</p>`)
        }
    })
}