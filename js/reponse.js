// create context object
var context = {};

/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */

const check_answer1 = async () => {

  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), response: document.getElementById('answer').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      alert(response)
    });
}

/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */

const check_answer2 = () => {

  //HERE SAVE FILE

  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), response: document.getElementById('answer').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */

const check_answer3 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), response: document.getElementsByClassName('answer-selected').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const check_answer4 = () => {
  //HERE SAVE FILE

  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), response: document.getElementById('answer').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 5 ----------------------------------- */
const check_answer5 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), response: document.getElementsByClassName('answer-selected').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}


/* ----------------------------------- GENERIQUE --------------------------------------- */
//FOR GAME ONE ADD CLASS LOOSE OR WIN AND REDICTECT EVENTUAL
function handle_user_responses(valid_resp, user_great_answer, nbr_user_answers) {
  let trial_storage = Number(localStorage.getItem('trial'));

  //Si on est au premier essaie
  if (trial_storage > 1) {
    //Si le nombre de bonne reponse est egale au nombre de bonne reponse de l'utilisateur (GAGNÉ!!!)
    if (valid_resp.data.length
      === user_great_answer.length
      && nbr_user_answers === valid_resp.data.length) {
      colors_button(valid_resp);
      clear_counter()
      goWin();
    } else {
      all_button_win();
      showWrongAnswer();
    }
  } else {
    colors_button(valid_resp);
    if (valid_resp.data.length === user_great_answer.length
      && nbr_user_answers === valid_resp.data.length
    ) {
      goWin(), clear_counter()
    } else {
      clear_counter(), goLoose(), showWrongAnswer()
    }
  }
}

function handle_user_responses2(valid_resp) {
  colors_button(valid_resp);
  goWin();
  clear_counter();
}

function handle_user_responses3(existFalseAnswer, tableauTri) {
  let trial_storage = Number(localStorage.getItem('trial'));
  //Si on est au premier essaie
  console.log(existFalseAnswer);
  if (trial_storage > 1) {
    if (!existFalseAnswer) {
      colors_button3(tableauTri)
      goWin();
      clear_counter()
    } else {
      colors_button3(tableauTri)
      showWrongAnswer();
    }
  } else {
    if (!existFalseAnswer) {
      colors_button3(tableauTri)
      goWin();
      clear_counter()
    } else {
      colors_button3(tableauTri)
      clear_counter(), goLoose(), showWrongAnswer()
    }
  }
}
function handle_user_responses4(existFalseAnswer, idsTab1, idsTab2) {
  let trial_storage = Number(localStorage.getItem('trial'));
  //Si on est au premier essaie
  if (trial_storage > 1) {
    if (!existFalseAnswer) {
      colors_button2(idsTab1, idsTab2)
      goWin();
      clear_counter()
    } else {
      colors_button2(idsTab1, idsTab2);
      showWrongAnswer();
    }
  } else {
    if (!existFalseAnswer) {
      colors_button2(idsTab1, idsTab2);
      goWin();
      clear_counter()
    } else {
      colors_button2(idsTab1, idsTab2);
      clear_counter(), goLoose(), showWrongAnswer()
    }
  }
}

function handle_user_responsesFinal(existFalseAnswer, valid_resp) {
  let trial_storage = Number(localStorage.getItem('trial'));
  //Si on est au premier essaie
  if (trial_storage > 1) {
    if (!existFalseAnswer) {
      colors_buttonFinal(valid_resp)
      clear_counter()
      goFinalWin();
    } else {
      colors_buttonFinal(valid_resp)
      showWrongAnswer();
    }
  } else {
    if (!existFalseAnswer) {
      colors_buttonFinal(valid_resp)
      goFinalWin(), clear_counter()
    } else {
      colors_buttonFinal(valid_resp)
      clear_counter(), goFinalLoose(), showWrongAnswer()
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
  valid_answers.data.map(el => (valid_answers_id.push(el.id)))

  $('.answer_button').each((index, button) => {
    valid_answers_id.includes(getId($(button).attr('id'))) ? $(button).addClass('win') : $(button).addClass('lose')
  })
}

function colors_button2(idsTab1, idsTab2) {
  $('.answer_button').each((index, button) => {
    if(index < 2) {
      idsTab1.includes(getId($(button).attr('id'))) ? $(button).addClass('win') : $(button).addClass('lose')
    } else {
      idsTab2.includes(getId($(button).attr('id'))) ? $(button).addClass('win') : $(button).addClass('lose')
    }
  })
}

function colors_button3(tableauTri) {
  for(i=0; i < tableauTri.length ; i++) {
    let $button = $('.dz > .answer_img:eq('+i+')')
    if($button.length > 0) {
      tableauTri[i].id === getId($button.attr('id')) ? $button.addClass('win') : $button.addClass('lose')
    }else {
      $button.addClass('lose')
    }
  }
}

function colors_buttonFinal(valid_resp) {
  $('input').each((index, button) => {
    $(button).val().toUpperCase() === valid_resp.data[0].content.charAt(index).toUpperCase() ? $(button).addClass('win') : $(button).addClass('lose')
  })
}

// assign functions to the object
context["check_answer1"] = check_answer1;
context["check_answer2"] = check_answer2;
context["check_answer3"] = check_answer3;
context["check_answer4"] = check_answer4;
context["check_answer5"] = check_answer5;


const check_answer = () => {
  localStorage.removeItem("game_played");
  context["check_answer" + Number(localStorage.getItem('DAY_NUM'))].apply()
}
