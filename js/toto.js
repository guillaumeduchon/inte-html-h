const get_date_server = async () => {
  await axios.get('/server/date_server.php', {
    headers: { 'Content-Type': 'application/json', 'mode': 'cors' }
  })
    .then((res) => { 
      localStorage.setItem('DATE_SERVER', res.data)
    })
}

get_date_server();