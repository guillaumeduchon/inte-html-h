/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */
const fetch_reponse = async () => {
  await axios.post('/server/reponse.php', { day_num: DAY_NUM }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        res.data.map(el => (
          $('.answers').append(`<div class="answer_button" id="answer_${el.id}" draggable="true" class="draggable" onDragStart="dragStart(event)" onDragEnd="dragEnd( event )">${el.content}</div>`)
        ))
      } else {
        showError();
      }
    });
}

const check_answer = (type_validation = "manuel") => {
  fetch_reponse_valid(type_validation);
}

const fetch_reponse_valid = async (type_validation) => {
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      //if there are at least one good answer return by api
      if (valid_resp.data[0].id !== undefined) {
        var aFalse_answers = [];
        //Boucle sur chaque reponse dans le document
        $('.answer_button').each((index, el) => {
          let id_answer = getId($(el).attr('id'));
          let is_good_anwer = false;

          Object.values(valid_resp.data).map((item) => {
            if (item.id === id_answer) is_good_anwer = true;
          })

          if (!is_good_anwer) aFalse_answers.push(id_answer);
        });

        var user_great_answer = [];
        var nbr_user_answers = 0;

        //Boucle sur chaque reponse donnée par l'utilisateur
        $('.dz > .answer_button').each((index, el) => {
          nbr_user_answers+=1;
          let user_answer_id = getId($(el).attr('id'));
          (!aFalse_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null); 
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers, type_validation)
        
        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */
const fetch_reponse2 = async () => {
  $(document).on('click',(el)=>{
    console.log(el.target);
    if (el.target.type === 'checkbox') {
      $(el.target).toggleClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: DAY_NUM }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        res.data.map(el => (
          $('form').append(`<label for="choice${el.id}"><input type="checkbox" name="${el.name}" id="answer_${el.id}"><div class="answer_button" id="answer_${el.id}">${el.content}</div></label>`)
        ))
      } else {
        showError();
      }
    });
}

const check_answer2 = (type_validation = "manuel") => {
  fetch_reponse_valid2(type_validation);
}

const fetch_reponse_valid2 = async (type_validation) => {
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      //if there are at least one good answer return by api
      if (valid_resp.data[0].id !== undefined) {
        var aGood_answers = [];
        //Boucle sur chaque reponse dans le document
        $('.answer_button').each((index, el) => {
          let id_answer = getId($(el).attr('id'));

          Object.values(valid_resp.data).map((item) => {
            if (item.id === id_answer) aGood_answers.push(id_answer);
          })
        });

        var user_great_answer = [];
        var nbr_user_answers = 0;

        //Boucle sur chaque reponse donnée par l'utilisateur
        $('.checkedAnswer').each((index, el) => {
          // console.log(el);
          nbr_user_answers+=1;
          let user_answer_id = getId(el.id);
          // console.log('1: ', user_answer_id);
          (aGood_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null);
          // console.log('2: ', aGood_answers); 
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers, type_validation)
        
        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */
const fetch_reponse3 = async () => {
  
  //RECUPERE LES BONNES REPONSES UNIQUEMENT
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
          var BONNE_REPONSES = res.data;
      } else {
        showError();
      }
    });
    
 //RECUPERE LES MAUVAISES REPONSES UNIQUEMENT
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: 'false'}, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        var MAUVAISE_REPONSES = res.data;
      } else {
        showError();
      }
    });

    const n = 3
    const result = [[], [], []] //we create it, then we'll fill it

    const answerPerLine = Math.ceil(MAUVAISE_REPONSES.length / 3)

    for (let line = 0; line < n; line++) {
      for (let i = 0; i < answerPerLine; i++) {
        const value = items[i + line * answerPerLine]
        if (!value) continue //avoid adding "undefined" values
        result[line].push(value)
      }
    }

    for (let line= 0; line < result.length; line++) {
      result[line].push(BONNE_REPONSES[line])
    }
    console.log('result :', result)
}


const check_answer3 = (type_validation = "manuel") => {
  fetch_reponse_valid3(type_validation);
}

const fetch_reponse_valid3 = async (type_validation) => {
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      //if there are at least one good answer return by api
      if (valid_resp.data[0].id !== undefined) {
        var aGood_answers = [];
        //Boucle sur chaque reponse dans le document
        $('.answer_button').each((index, el) => {
          let id_answer = getId($(el).attr('id'));

          Object.values(valid_resp.data).map((item) => {
            if (item.id === id_answer) aGood_answers.push(id_answer);
          })
        });

        var user_great_answer = [];
        var nbr_user_answers = 0;

        //Boucle sur chaque reponse donnée par l'utilisateur
        $('."carousel_cell.is-selected"').each((index, el) => {
          // console.log(el);
          nbr_user_answers+=1;
          let user_answer_id = getId(el.id);
          // console.log('1: ', user_answer_id);
          (aGood_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null);
          // console.log('2: ', aGood_answers); 
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers, type_validation)
        
        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* -------------------
---------------- REPONSE JEU 4 ----------------------------------- */
const fetch_reponse4 = async () => {
  $(document).on('click',(el)=>{
    console.log(el.target);
    if (el.target.type === 'radio') {
      $(el.target).toggleClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: DAY_NUM }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        res.data.map(el => (
          $('form').append(`<label for="choice${el.id}"><input type="radio" id="answer_${el.id}" name="${el.name}" value=""><div class="answer_button" id="answer_${el.id}"><span>${el.content}</span></div></label>`)
        ))
      } else {
        showError();
      }
    });
}

const check_answer4 = (type_validation = "manuel") => {
  fetch_reponse_valid2(type_validation);
}

/* ----------------------------------- GENERIQUE --------------------------------------- */
//FOR GAME ONE ADD CLASS LOOSE OR WIN AND REDICTECT EVENTUAL
function handle_user_responses(valid_resp, user_great_answer, nbr_user_answers, type_validation) {
  let trial_storage = Number(localStorage.getItem('trial'));

  //Si on est au premier essaie
  if (trial_storage > 1) {
    //Si le nombre de bonne reponse est egale au nombre de bonne reponse de l'utilisateur (GAGNÉ!!!)
    if (valid_resp.data.length 
      === user_great_answer.length 
      && nbr_user_answers === valid_resp.data.length
    ) {
      colors_button(valid_resp);
      clear_counter()
      goWin();
    } else {
      /*(CACHER MAUVAISE REPONSE POUR LE MOMENT!!!)*/
      all_button_win();
      showWrongAnswer();
    }
  } else {
    colors_button(valid_resp);
    if (valid_resp.data.length === user_great_answer.length 
      && nbr_user_answers === valid_resp.data.length
    ) {
      goWin(),clear_counter()
    } else {
      clear_counter(),goLoose(),showWrongAnswer()
    }
  }
}

//---------------------------------------------Utils
function getId(answer) { return Number(answer.replace('answer_', '')); }

function all_button_win() {
  $('.answer_button').each((index, button) => {
    $(button).addClass('win')
  })
}

function colors_button(valid_answers) {
  let valid_answers_id = [];
  valid_answers.data.map(el=>(valid_answers_id.push(el.id)))
  
  $('.answer_button').each((index, button) => {
    valid_answers_id.includes(getId($(button).attr('id'))) ? $(button).addClass('win') : $(button).addClass('lose')
  })
}
