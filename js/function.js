let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

// CHANGE COLOR SELECT OPTION
$(document).ready(function() {
  $('#magasin').css('color','#323864');
  $('#magasin').change(function() {
     var current = $('#magasin').val();
     if (current != 'null') {
         $('#magasin').css('color','#323864');
         $('.connect_form-select').toggleClass('changed');
     } else {
         $('#magasin').css('color','#323864');
     }
  }); 
});

// GAME
// QCM 1
function attachCheckboxHandlers () {
  var el = document.getElementById("question1");
  var answers = document.getElementsByTagName("input")[0];
  var answer = document.getElementsByClassName("answer_button");
  var valide = document.getElementById("valide");

  for (var i=0, len=answers.length; i<len; i++) {
    if ( answers[i].type === 'checkbox' ) {
      valide.onclick = function(){
        killTimer();
        if (answers.value === "true") {
          answer.classList.add = "win";
        } else {
          answer.classList.add = "lose";
        }
      }
    }
  } 
}

const checkIsActiveMagasin = async () => {
  return await axios.post('/server/magasin.php', {magasin: localStorage.getItem('magasin'), active:''}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}
  }).then((res) => {
    return res.data
  });
}

// function update(e) {
//   var form = this.form;
//   var val = value;
//   if ( this.checked ) {
//     val = answer.classList.add("win");
//   }
// }

// CHANGE BORDER Q6