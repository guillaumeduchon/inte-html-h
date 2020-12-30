let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

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

// function update(e) {
//   var form = this.form;
//   var val = value;
//   if ( this.checked ) {
//     val = answer.classList.add("win");
//   }
// }

// CHANGE BORDER Q6