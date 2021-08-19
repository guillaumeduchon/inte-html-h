// /** - TIMER - **/
// // Credit: Mateusz Rybczonec

// const FULL_DASH_ARRAY = 283;
// const WARNING_THRESHOLD = 10;
// const ALERT_THRESHOLD = 3;

// const TIME_LIMIT = localStorage.getItem('timeLeft') ?  Number(localStorage.getItem('timeLeft')) : 24;
// let timePassed = 0;
// localStorage.setItem('trial', 3);
// let timeLeft = TIME_LIMIT;
// let timerInterval = null;

// document.getElementById("timer").innerHTML = `
// <div class="timer_new">
//   <svg class="timer_new__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <g class="timer_new__circle">
//       <circle class="timer_new__path-elapsed" cx="50" cy="50" r="45"></circle>
//       <path
//         id="timer_new-path-remaining"
//         stroke-dasharray="0 283"
//         class="timer_new__path-remaining green"
//         d="
//           M 50, 50
//           m -45, 0
//           a 45,45 0 1,0 90,0
//           a 45,45 0 1,0 -90,0
//         "
//       ></path>
//     </g>
//   </svg>
//   <div class="timer_new__label">
//     <span class="label">TIMER</span>
//     <span id="timer_new-label" class="timer_new__seconds">${formatTime(
//         timeLeft
//     )}</span>
//   </div>
// </div>
// `;

// startTimer();

// function onTimesUp() {
//   clearInterval(timerInterval);
//   reset_time();
//   Number(localStorage.getItem('trial')) >= 2  ? startTimer() : null;
// }

// function startTimer() {
//   localStorage.setItem('trial', Number(localStorage.getItem('trial')) - 1);
//   $('.trial').find('img').attr('src','img/essai_'+localStorage.getItem('trial')+'.png')

//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1;
//     timeLeft = TIME_LIMIT - timePassed;
//     localStorage.setItem('timeLeft',timeLeft)
//     //label 
//     document.getElementById("timer_new-label").innerHTML = formatTime(
//       localStorage.getItem('timeLeft')
//     );

//     setCircleDasharray();

//     if (localStorage.getItem('timeLeft') === '0') {
//       check_answer();
//     }
//   }, 1000);
// }

// function reset_time(){
//   localStorage.setItem('timeLeft', 24);
//   timePassed = 0;
// }

// function formatTime(time) {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   if (seconds < 10) {
//     seconds = `${seconds}`;
//   }

//   return `${seconds}s`;
// }

// function calculateTimeFraction() {
//   const rawTimeFraction =  localStorage.getItem('timeLeft') / TIME_LIMIT;
//   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
// }

// function setCircleDasharray() {
//   const circleDasharray = `${(
//     FULL_DASH_ARRAY - (calculateTimeFraction() * FULL_DASH_ARRAY)
//   ).toFixed(0)} 283`;
//   document
//     .getElementById("timer_new-path-remaining")
//     .setAttribute("stroke-dasharray", circleDasharray);
// }

// function killTimer() {
//   const circleDasharray = '295 283';
//   formatTime = '0';
// }