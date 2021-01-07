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
  await axios.post('/server/reponse.php', { day_num: DAY_NUM, valid: true }, {
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

        //Boucle sur chaque reponse donnée par l'utilisateur
        $('.dz > .answer_button').each((index, el) => {
          let user_answer_id = getId($(el).attr('id'));
          (!aFalse_answer.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null); 
        });

        handle_user_responses(valid_resp.data.length, user_great_answer, type_validation)
        
        type_validation === "manuel" ? onTimesUp() : null;

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

//FOR GAME ONE ADD CLASS LOOSE OR WIN AND REDICTECT EVENTUAL
function handle_user_responses(nb_valid_answers, user_great_answer, type_validation) {
  let trial_storage = Number(localStorage.getItem('trial'));

  //Si on est au premier essaie
  if (trial_storage > 1) {
    //Si le nombre de bonne reponse est egale au nombre de bonne reponse de l'utilisateur (GAGNÉ!!!)
    if (nb_valid_answers === user_great_answer.length) {
      colors_button(user_great_answer)
      goWin()
    } else {
      /*(CACHER MAUVAISE REPONSE POUR LE MOMENT!!!)*/
      all_button_win();
    }
  } else {
    colors_button(user_great_answer)
    if (nb_valid_answers === user_great_answer.length ? goWin() : goLoose());
  }
}

//---------------------------------------------Utils
function getId(answer) { return Number(answer.replace('answer_', '')); }

function all_button_win() {
  $('.answer_button').each((index, button) => {
    $(button).addClass('win')
  })
}

function colors_button(user_great_answer) {
  $('.answer_button').each((index, button) => {
    user_great_answer.includes(getId($(button).attr('id'))) ? $(button).addClass('win') : $(button).addClass('lose')
  })
}
