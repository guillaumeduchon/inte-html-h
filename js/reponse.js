// create context object
var context = {};

/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */

const fetch_reponse = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
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

const check_answer1 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
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
          nbr_user_answers += 1;
          let user_answer_id = getId($(el).attr('id'));
          (!aFalse_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null);
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers)

        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */
const fetch_reponse2 = async () => {
  $(document).on('click', (el) => {
    if (el.target.type === 'checkbox') {
      $(el.target).toggleClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
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

const check_answer2 = () => {
  fetch_reponse_valid2();
}
const fetch_reponse_valid2 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
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
          nbr_user_answers += 1;
          let user_answer_id = getId(el.id);
          (aGood_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null);
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers)

        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}
/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */
const fetch_reponse3 = async () => {
  //RECUPERE LES BONNES REPONSES UNIQUEMENT
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        BONNE_REPONSES = res.data;
      } else {
        showError();
      }
    });

  //RECUPERE LES MAUVAISES REPONSES UNIQUEMENT
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'false' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        MAUVAISE_REPONSES = res.data;
      } else {
        showError();
      }
    });

  //Nbr tableau désiré
  const n = 4;
  const answers_array = [[], [], [], []]; //we create it, then we'll fill it

  const answerPerLine = Math.ceil(MAUVAISE_REPONSES.length / n);

  //REMPLI LE TABLEAU EN RESULT EN 3 TABLEAU DE MAUVAISE REPONSE
  for (let line = 0; line < n; line++) {
    for (let i = 0; i < answerPerLine; i++) {
      const value = MAUVAISE_REPONSES[i + line * answerPerLine];
      if (!value) continue //avoid adding "undefined" values
      answers_array[line].push(value);
    }
  }

  //AJOUTE UNE BONNE REPONSE PAR TABLEAU DU TABLEAU RESULT
  for (let line = 0; line < answers_array.length; line++) {
    //CREER UN TABLEAU AVEC LE ID DE LA BONNE REPONSE LIÉ A UNE LIGNE (SELON L'INDEX)
    answers_array[line].push(BONNE_REPONSES[line]);
    if(line === Math.floor(Math.random() * Math.floor(answers_array.length))) 
      answers_array[line].reverse()
  }

  // var tab_line;
  answers_array.forEach((tab_line, index) => {
    tab_line.forEach((response, i) => {
      var $carousel = $('.game_carousel:eq(' + index + ')').flickity();
      var $slideGame = $(`<div class="carousel_cell">
      <figure class="item">
        <img src="${response.reponse_url}" alt="">
          <figcaption class="answer_button answer_${response.id}" id="${response.id}">${response.content}</figcaption>
      </figure>
    </div>`);
    $carousel.flickity('append', $slideGame);
    })
  })
}

const check_answer3 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
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
          });
        });

        var user_great_answer = [];
        var nbr_user_answers = 0;

        //Boucle sur chaque reponse donnée par l'utilisateur
        $('.carousel_cell.is-selected').each((index, el) => {
          let user_answer_id = Number($(el).find('.answer_button').attr('id'))
          nbr_user_answers += 1;
          aGood_answers.includes(user_answer_id) ? user_great_answer.push(user_answer_id) : null;
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers)

        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const fetch_reponse4 = async () => {
  $(document).on('click', (el) => {
    if (el.target.type === 'radio') {
      $('input:radio[name=' + $(el.target).attr('name') + ']').removeClass('checkedAnswer');
      $(el.target).addClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        res.data.map(el => (
          $('form').append(`<label for="choice${el.id}"><input type="radio" id="answer_${el.id}" name="radio" value=""><div class="answer_button" id="answer_${el.id}"><span>${el.content}</span></div></label>`)
        ))
      } else {
        showError();
      }
    });
}
const check_answer4 = () => {
  fetch_reponse_valid2();
}

/* ----------------------------------- REPONSE JEU 5 ----------------------------------- */
const check_answer5 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      if (valid_resp.data[0].id !== undefined) {
        var aGood_answers = [];

        $('.answer_button').each((index, el) => {
          let id_answer = getId($(el).attr('id'));

          Object.values(valid_resp.data).map((item) => {
            if (item.id === id_answer) aGood_answers.push(id_answer);
          })
        });
     
        var user_great_answer = [];
        var nbr_user_answers = 0;

        $('.checkedAnswer').each((index, el) => {
          nbr_user_answers += 1;
          (aGood_answers.includes(getId(el.id)) ? user_great_answer.push(getId(el.id)) : null);
        });

        handle_user_responses(valid_resp, user_great_answer, nbr_user_answers)

        onTimesUp()

      } else {
        console.warn('Aucune bonne reponse n\'a été trouvé')
      }
    });
}

/* ----------------------------------- REPONSE JEU 6 ----------------------------------- */
function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
const fetch_reponse6 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        let array =[]
        for (i=0; i < res.data.length; i++) {
          array.push(i)
        };
        array = randomArrayShuffle(array); 
        array.map((value, index) => {
          // $('.dropzone').append(`<div class="dropdiv dz" onDragEnter="dragEnter( event )" onDragOver="dragOver( event )" onDragLeave="dragLeave( event )" onDrop="dragDrop( event )"></div>`);
          // $('.answers').append(`<div class="answer_button" id="answer_${res.data[value].id}">${res.data[value].content}</div>`);
          $('.grid_parfums').append(`<img src="${res.data[value].reponse_url}" alt="" id="answer_${res.data[value].id}" draggable="true" class="answer_img" onDragStart="dragStart(event)" onDragEnd="dragEnd( event )">`)
        })
      } else {
        showError();
      }
    });
}
const check_answer6 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
  .then((valid_resp) => {
    if (valid_resp.data[0].id !== undefined) {
      var tableauTriJ6 = [{}, {}, {}];

      valid_resp.data.map(el => {
        (el.id === 24 ? tableauTriJ6.splice(0, 1, el) : null);
        (el.id === 25 ? tableauTriJ6.splice(1, 1, el) : null);
        (el.id === 26 ? tableauTriJ6.splice(2, 1, el) : null);
      })

      var existFalseAnswer = false;
      $('.dz > .answer_img').each((index, el) => {
        if (getId($(el).attr('id')) !== tableauTriJ6[index].id) {
          existFalseAnswer = true;
        }
      });

      if ($('.dz > .answer_img').length !== tableauTriJ6.length) {
        existFalseAnswer = true;
      }

      handle_user_responses3(existFalseAnswer, tableauTriJ6)

      onTimesUp()

    } else {
      console.warn('Aucune bonne reponse n\'a été trouvé')
    }
  });
}

/* ----------------------------------- REPONSE JEU 7 ----------------------------------- */

const fetch_reponse7 = async () => {
  $(document).on('click', (el) => {
    if (el.target.type === 'radio') {
      $('input:radio[name=' + $(el.target).attr('name') + ']').removeClass('checkedAnswer');
      $(el.target).addClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        res.data.map(el => (
          $('form').append(`<label for="choice${el.id}"><input type="radio" id="answer_${el.id}" name="radio" value=""><div class="answer_block" id="answer_${el.id}"><img src="${el.reponse_url}" alt="${el.content}"><div class="answer_button" id="answer_${el.id}">${el.content}</div></div></label>`)
        ))
      } else {
        showError();
      }
    });
}
const check_answer7 = () => {
  fetch_reponse_valid2();
}

/* ----------------------------------- REPONSE JEU 8 ----------------------------------- */

const fetch_reponse8 = async () => {
  $(document).on('click', (el) => {
    if (el.target.type === 'radio') {
      $('input:radio[name=' + $(el.target).attr('name') + ']').removeClass('checkedAnswer');
      $(el.target).addClass('checkedAnswer');
    }
  });
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => {
      if (res.data[0].id !== undefined) {
        var imgArrayMiddle = { id: 100, content: '<label><img src="img/q8_h24.png" alt=""></label>' };
        res.data.splice(1, 0, imgArrayMiddle);
        res.data.map(el => {
          if (el.id === 100) {
            $('form').append(`<label><img src="img/q8_h24.png" alt=""></label>`)
          } else {
            $('form').append(`<label for="choice${el.id}"><input type="radio" id="answer_${el.id}" name="radio" value=""><div class="answer_button" id="answer_${el.id}"><span>${el.content}</span></div></label>`)
          }
        })
      } else {
        showError();
      }
    });
}
const check_answer8 = () => {
  fetch_reponse_valid2();
}

/* ----------------------------------- REPONSE JEU 9 ----------------------------------- */

const fetch_reponse9 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')) }, {
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
const check_answer9 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
  .then((valid_resp) => {
    if (valid_resp.data[0].id !== undefined) {
      
      var tableauTriJ9 = [{}, {}, {}, {}];
      
      valid_resp.data.map(el => {
        (el.id === 35 ? tableauTriJ9.splice(0, 1, el) : null);
        (el.id === 36 ? tableauTriJ9.splice(1, 1, el) : null);
        (el.id === 37 ? tableauTriJ9.splice(2, 1, el) : null);
        (el.id === 34 ? tableauTriJ9.splice(3, 1, el) : null);
      })

      var existFalseAnswer = false;
      let idsTab1 = [];
      let idsTab2 = [];
      tableauTriJ9.slice(0, 2).map((e)=> idsTab1.push(e.id))
      tableauTriJ9.slice(2, 4).map((e)=> idsTab2.push(e.id))

      $('.dz > .answer_button').each((index, el) => {$
        if(index < 2) {
          if (!idsTab1.includes(getId($(el).attr('id')))) {
            existFalseAnswer = true;
          }
        } else {
          if (!idsTab2.includes(getId($(el).attr('id')))) {
            existFalseAnswer = true;
          }
        }
        
      });
      
      if($('.dz > .answer_button').length === 0) {
        existFalseAnswer = true;
      }

      console.log('EXIST', existFalseAnswer);

      handle_user_responses4(existFalseAnswer, idsTab1, idsTab2);

      onTimesUp()

    } else {
      console.warn('Aucune bonne reponse n\'a été trouvé');
    }
  });
}

/* ----------------------------------- REPONSE JEU 10 ----------------------------------- */
const check_answer10 = async () => {
  await axios.post('/server/reponse.php', { day_num: Number(localStorage.getItem('DAY_NUM')), valid: 'true' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      if (valid_resp.data[0].id !== undefined) {
        let existFalseAnswer = false;

        $('.finalgame_answer').find('input').each((index, el) => {
          if ($(el).val().toUpperCase() !== valid_resp.data[0].content.charAt(index).toUpperCase()) {
            existFalseAnswer = true;
          }
        });

        handle_user_responsesFinal(existFalseAnswer, valid_resp);

        onTimesUp()

      } else {
        console.warn('recuperation bdd error ')
      }
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
context["check_answer6"] = check_answer6;
context["check_answer7"] = check_answer7;
context["check_answer8"] = check_answer8;
context["check_answer9"] = check_answer9;
context["check_answer10"] = check_answer10;


const check_answer = () => {
  localStorage.removeItem("game_played");
  context["check_answer" + Number(localStorage.getItem('DAY_NUM'))].apply()
}
