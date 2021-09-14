/* ----------------------------------- REPONSE JEU 1 ----------------------------------- */
const check_answer1 = async () => {
  if (document.getElementById('answer').value.trim() === "") return false;
  await axios.post('/server/set_reponse.php', { day_num: '1', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      window.location.href = "game_end.html?day=" + 1
    });
}
/* ----------------------------------- REPONSE JEU 2 ----------------------------------- */

const check_answer2 = async () => {
  if (document.getElementById('answer').value.trim() === "") return false;
  if (fetchSaveFiles('2')) {
    await axios.post('/server/set_reponse.php', { day_num: '2', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((response) => {
        window.location.href = "game_end.html?day=" + 2
      });
  } else {
    showError();
  }
}

/* ----------------------------------- REPONSE JEU 3 ----------------------------------- */
const check_answer3 = async () => {
  let response_id = $('.answer_selected').data('id')
  await axios.post('/server/set_reponse.php', { day_num: '3', response: response_id, magasin_num: localStorage.getItem('magasin') }, {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((response) => {
      window.location.href = 'game_end_day3.html'
    });
}
/* ----------------------------------- REPONSE JEU 4 ----------------------------------- */

const check_answer4 = async () => {
  if (document.getElementById('answer').value.trim() === "") return false;
  if (fetchSaveFiles('4')) {
    await axios.post('/server/set_reponse.php', { day_num: '4', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((response) => {
        window.location.href = "game_end.html?day=" + 4
      });
  } else {
    showError();
  }
}
/* ----------------------------------- REPONSE JEU 5 ----------------------------------- */
const check_answer5 = async () => {
  const goodAnswer = "sourcingsolidaire"

  let answerFormated = document.getElementById('answer').value.trim().toLowerCase().replace(/\ /g, "")
  if (answerFormated === "") return false;
  if (new RegExp(goodAnswer).test(answerFormated)) {
    await axios.post('/server/set_reponse.php', { day_num: '5', response: document.getElementById('answer').value, magasin_num: localStorage.getItem('magasin') }, {
      headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
    })
      .then((response) => {
        window.location.href = 'game_end_day5.html'
      });
  } else {
    console.log("answerFormated5: FALSE ", answerFormated)
    showError();
  }
}

if (/game_day2|game_day4/.test(location.pathname)) {
  var fileInput = document.getElementById('files');
  fileInput.addEventListener('change', function (evnt) {
    fileList = [];
    for (var i = 0; i < fileInput.files.length; i++) {
      fileList.push(fileInput.files[i]);
    }
  });
}

$('#files-game-2').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});

$('#form5').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    $("form").on('keypress', check_answer5);
  }
});


const authorized_format_file = ["image/jpeg", "image/gif",
  "image/png", "image/webp",
  "image/jpg", "image/bmp",
  "image/prs.btif", "image/g3fax",
  "image/pjpeg", "mage/x-png",
  "image/x-portable-pixmap"]
function fetchSaveFiles(game_num) {
  let isImageFile = true;
  fileList.forEach(function (file) {
    if (authorized_format_file.includes(file.type)) {
      saveFiles(file, game_num);
    } else {
      isImageFile = false;
    }
  });

  return isImageFile;
}

function saveFiles(file, game_num) {
  var formData = new FormData();
  formData.set('file', file);
  formData.set('file_name', file.name);
  formData.set('magasin_name', localStorage.getItem("magasin_name").replace(' ', '_') + "-" + localStorage.getItem("magasin"));
  formData.set('game_num', game_num);

  $.ajax({
    url: '/server/image.php',
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    type: 'post',
    success: function (response) {
      response = JSON.parse(response);

      if (response.error !== undefined) {
        $("#danger").empty().append('Une erreur s\'est produite').fadeIn().delay(2000).fadeOut();
        return false;
      }
    }
  });
}

const get_answer3_stats = async () => {
  await axios.get('/server/answer3_stats.php', {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((valid_resp) => {
      if (valid_resp.data) {
        $('.pc').each((i, e) => {
          let value = valid_resp.data[i + 1] === undefined ? 0 : valid_resp.data[i + 1];
          $(e).parent().parent().find('.progress').attr('style', 'width:' + value + '%;')
          $(e).html(value + '%');
        });
      }
    });
}