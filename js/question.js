//------------------------------------------------QUESTION---------------------------------------
const fetch_rules= async()=> {
    response =  await axios.post('/server/question.php', {day_num: DAY_NUM, type: 'rules'}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
    .then((resp)=>{
        //if there are at least one good answer return by api
        if (resp.data[0].id !== undefined) {
            $('.').html(resp.data.rules)
        }
    })
}

const fetch_content= async()=> {
    response =  await axios.post('/server/question.php', {day_num: DAY_NUM, type: 'content'}, {
    headers: {'Content-Type': 'application/json','mode': 'cors'}})
    .then((resp)=>{
        //if there are at least one good answer return by api
        if (resp.data[0].id !== undefined) {
            $('.').html(resp.data.content)
        }
    })
}