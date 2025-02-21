const data = fetch('url', {
  method: 'GET'
})
  .then((data) => {
    if (data.status === 200) {
      return data.json(); // тоже промис, нужно обработать then
    } else {
      console.log('error');
    }
  })
  .then((info) => { // обрабатывается здесь
    console.log(info); // получаем данные
  });

// GET - получить данные (по умолчанию)
// POST - я отдаю данные серверу, чтобы он сохранил
fetch('url', {
  method: 'POST',
  body: JSON.stringify(newObject)
});

//query параметры - не отправлять body в POST, а передавать в урл запроса
const url = `url?key=value&key=value`;

fetch(url) //get по умолчанию
  .then((data) => {
    if (data.status === 200) {
      return data.json(); 
    } else {
      console.log('error');
    }
  })
  .then((info) => { 
    console.log(info); 
    renderData(info);
  });

function renderData(data) {
  const div = document.createElement('div');
  div.textContent = data;
  document.body.append(div);
}