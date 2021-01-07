//------------------------------------------------QUESTION---------------------------------------

const fetch_question=()=> {
    const get_question = async () => {
      response =  await fetch('/server/question.php').then((res)=> res.data );
      return response;
    }
  
    get_question().then((res)=>{
      //
    })
  }