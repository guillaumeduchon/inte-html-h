/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */

const check_answer1 = async () => {

  await axios.post('/server/set_reponse.php', { day_num: '1', response: document.getElementById('answer').value, magasin_num: '' }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      alert(response)
    });
}

/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */

const check_answer2 = () => {

  //HERE SAVE FILE

  await axios.post('/server/set_reponse.php', { day_num: '2', response: document.getElementById('answer').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */

const check_answer3 = async () => {
  await axios.post('/server/set_reponse.php', { day_num: '3', response: document.getElementsByClassName('answer-selected').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const check_answer4 = () => {
  //HERE SAVE FILE

  await axios.post('/server/set_reponse.php', { day_num: '4', response: document.getElementById('answer').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

/* ----------------------------------- REPONSE JEU 5 ----------------------------------- */
const check_answer5 = async () => {
  await axios.post('/server/set_reponse.php', { day_num: '5', response: document.getElementsByClassName('answer-selected').value }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}