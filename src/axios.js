//get, post, delete..
const url = `url?key=value&key=value`;

axios.get(url); //promise, значит нужен then

axios.get(url).then((response) => { //достаточно then один, без .json()
  console.log(response);  
});

axios.post(url, {
  method: 'POST',
  title: 'dfgdsf' //новые данные
}).then((response) => { 
  console.log(response);  
});

axios(url, { //по умолчанию гет-запрос
  method: 'POST', //можно поставить пост
  data: { title: 'dfgdsf'} //новые данные
}).then((response) => { 
  console.log(response);  
});;