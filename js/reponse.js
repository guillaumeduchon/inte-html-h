/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */
const check_answer1 = async () => {

  await axios.post('/server/set_reponse.php', { day_num: '1', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      alert("WHOUHOUW")
    });
}
/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */

const check_answer2 = async () => {
  fetchSaveFiles('2')
  await axios.post('/server/set_reponse.php', { day_num: '2', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert("WHOUHOUW")
    });
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */
const check_answer3 = async () => {
  await axios.post('/server/set_reponse.php', { day_num: '3', response: document.getElementsByClassName('answer-selected').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert("WHOUHOUW")
    });
}
/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const check_answer4 = async () => {
  fetchSaveFiles('4')
  await axios.post('/server/set_reponse.php', { day_num: '4', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      alert("WHOUHOUW")
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

var fileInput = document.getElementById('files');
fileInput.addEventListener('change', function (evnt) {
  fileList = [];
  for (var i = 0; i < fileInput.files.length; i++) {
    fileList.push(fileInput.files[i]);
  }
  //renderFileList();
});

function fetchSaveFiles(game_num) {
  fileList.forEach(function (file) {
    saveFiles(file, game_num);
  });
}

// renderFileList = function () {
//   //fileListDisplay.innerHTML = '';
//   fileList.forEach(function (file, index) {
//     var fileDisplayEl = document.createElement('p');
//     fileDisplayEl.innerHTML = (index + 1) + ': ' + file.name;
//     //fileListDisplay.appendChild(fileDisplayEl);
//   });
// };

function saveFiles(file, game_num) {
  var formData = new FormData();
  formData.set('file', file);
  formData.set('magasin_name', localStorage.getItem("magasin_name") + "_" + localStorage.getItem("magasin"));
  formData.set('game_num', game_num);
  formData.set('product_salt_name', "PArfumTOTO"); // HEre the name in the input .anwser

  $.ajax({
    url: '/server/image.php',
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    type: 'post',
    success: function (response) {
      console.log(response)
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