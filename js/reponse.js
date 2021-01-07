//------------------------------------------------REPONSE---------------------------------------
const check_answer = (send_type = "manuel") => {
  fetch_reponse_valid(get_user_answers(), send_type);
}
  
const fetch_reponse = async ()=> {
    await axios.post('/server/reponse.php', {day_num: DAY_NUM}, {

      headers: {'Content-Type': 'application/json','mode': 'cors'}})
        .then((res)=>{
          if (res.data[0].id !== undefined) {
            res.data.map(el=>(
              $('.answers').append(`<div class="answer_button" id="answer_${el.id}" draggable="true" class="draggable" onDragStart="dragStart(event)" onDragEnd="dragEnd( event )">${el.content}</div>`)
            ))
          } else {
            showError();
          } 
        });
}
  
const fetch_reponse_valid = async (user_answers, send_type)=> {
  await axios.post('/server/reponse.php', {day_num: DAY_NUM, valid: true}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
      .then((valid_resp)=>{
        //if there are at least one good answer return by api
        if (valid_resp.data[0].id !== undefined) {
          var error_answer = [];
          $('.answer_button').each((index, el)=> {
            let id_el = $(el).attr('id');
            let id = getAnswerId(id_el);
            let find = false;
            Object.values(valid_resp.data).map((rep)=>{
               if(rep.id === id) find = true; 
            })

            if(!find) error_answer.push(id);
          });
          
          //If an error has been find
          if(error_answer.length > 0) {
            var nbr_good_answer = 0;
            $('.dz > .answer_button').each((index, el)=>{
              let id_el = $(el).attr('id');
              let id = getAnswerId(id_el);
              if (error_answer.includes(id)) {
                make_result($(el))
              } else {
                nbr_good_answer+= 1;
                $(el).addClass('win');
              }
            });
            
            //if error not in user answers
            if(valid_resp.data.length === nbr_good_answer) {
              goWin();
            }

            if(send_type === "manuel") {
              valid_before_times_up()
            }

          } else {
            goWin();
          }
        } else {
          showError();
        } 
      });
}

function get_user_answers(){
  let answers_el = $('.dropzone').find('.answer_button')
  let answers_tab = []
  answers_el.each((index, el)=>{
    answers_tab.push(el.id)
  })

  return answers_tab;
}

//FOR GAME ONE ADD CLASS LOOSE OR WIN AND REDICTECT EVENTUAL
function make_result(element, send_type) {
  //Si une mauvaise reponse est dans les reponses données , la mettre en rouge sinon la mettre en win 
  if(element.parent().parent().has('.dz').lenght > 0) {
    element.addClass('lose')
  } else {
    //Si on est au dernier essaie et qu'il y a une erreur
    if(localStorage.getItem('trial') === '0'){
      element.addClass('lose')
      goLoose();
    }else{
        element.addClass('win')
    }
  } 
}

//---------------------------------------------Utils
function getAnswerId(answer) {return Number(answer.replace('answer_',''));}
