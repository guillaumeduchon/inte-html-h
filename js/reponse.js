/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */
const check_answer1 = async () => {

  await axios.post('/server/set_reponse.php', { day_num: '1', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      alert(response)
    });
}
/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */

const check_answer2 = () => {
  saveFiles().then(function () {
    await axios.post('/server/set_reponse.php', { day_num: '2', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((valid_resp) => {
        alert(valid_resp)
      });
  });
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */
const check_answer3 = async () => {
  await axios.post('/server/set_reponse.php', { day_num: '3', response: document.getElementsByClassName('answer-selected').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}
/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const check_answer4 = () => {
  //HERE SAVE FILE
  saveFiles().then(function () {
    await axios.post('/server/set_reponse.php', { day_num: '4', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((valid_resp) => {
        alert(valid_resp)
      });
  });
}
/* ----------------------------------- REPONSE JEU 5 ----------------------------------- */
const check_answer5 = async () => {
  await axios.post('/server/set_reponse.php', { day_num: '5', response: document.getElementsByClassName('answer-selected').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert(valid_resp)
    });
}

function saveFiles() {
  var file_data = $('#file-1').prop('files')[0];
  form_data.append('file', file_data);

  $.ajax({
    url: 'image.php',
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function (response) {
      response = JSON.parse(response);

      if (response.error !== undefined) {
        $("#danger").empty().append('Une erreur s\'est produite').fadeIn().delay(2000).fadeOut();
        
        return false;
      }

      //$('#' + img_url + '_link').attr('href', url);
      //$("#succes").empty().append(response).fadeIn().delay(2000).fadeOut();
    }
  });
}