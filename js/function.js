let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

// CHANGE COLOR SELECT OPTION
$(document).ready(function() {
  $('#magasin').css('color','#b3b5b4');
  $('#magasin').change(function() {
     var current = $('#magasin').val();
     if (current != 'null') {
         $('#magasin').css('color','#305c67');
         $('#magasin').css('border-bottom','2px solid #305c67');
         $('.connect_form-select').toggleClass('changed');
     } else {
         $('#magasin').css('color','#b3b5b4');
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

// function update(e) {
//   var form = this.form;
//   var val = value;
//   if ( this.checked ) {
//     val = answer.classList.add("win");
//   }
// }

// CHANGE BORDER Q6
const DATE_TAB = [
  { 1: '07/01/2021' },
  { 2: '08/01/2021' },
  { 3: '09/01/2021' },
  { 4: '10/01/2021' },
  { 5: '11/01/2021' },
  { 6: '12/01/2021' },
  { 7: '13/01/2021' },
  { 8: '14/01/2021' },
  { 9: '15/01/2021' },
  { 10: '16/01/2021' }
];
var date_today = get_date_today(new Date())
var tab_day = Object.keys(DATE_TAB.filter(obj=>( Object.values(obj) == date_today))[0])
const DAY_NUM = tab_day[0];