// синхронное выполнение функций. Долго выполняющиеся функции блокируют выполнение дальнейшего кода.

const wait = (ms, callback) => {
  setTimeout(callback, ms); // асинхр
}

console.log(1);
wait(5000, () => console.log(2));
console.log(3);
// 1 3 2

//за последовательность выполнения кода отвечает событийный цикл(СЦ) - event loop. js Однопоточный язык - по очереди, одна задача за раз. В СЦ добавляются все асинхронные задачи в очередь, и ждет пока освободится основной поток выполнения задач

//сразу
console.log('начало');

//асинхронно
setTimeout(() => {
  console.log('асинхронно');  
}, 2000)

//сразу
console.log('конец');

// callback - функция, которая вызывается в ответ на совершение определенного события
// callback - способ асинхронно выполнить какое-то действие
setTimeout(() => { // первый аргумент - функция - пример колбэка
  console.log('асинхронно');  
}, 2000);

const makeRequest = (url, onSucsses) => {
  
}

const sellerId = 154;
makeRequest(`/api/sellers/${sellerId}`, (seller) => { //запрос возвращает данные, например о продавце seller
  const firstProductId = seller.productIds[0];

  makeRequest(`/api/products/${firstProductId}`, (product) => {// инфа о первом товаре
    const firstReviewId = product.reviewsIds[0];

    makeRequest(`/api/reviews/${firstReviewId}`, (review) => { //инфа о первом отзыве о первом товаре
      const authorName = review.author.name;
    });
  }); 
}); // ад коллбэков

/* promise - надстройка для работы с асинхронным кодом 
может находиться в одном из трех состояний:
- pending - ожидание
- fulfilled - выполнено успешно
- rejected - выполнено с ошибкой

Промис может изменять состояние только один раз, из пендинг в фулфилд/реджект

Методы промиса:
- then() - обрабатывает fulfilled
- catch() - обрабатывает rejected
- finally() - независимо от результата + или - 

Асинхронная функция возвращает промис в качестве результата.

let promise = new Promise(function(resolve, reject) {
  // функция-исполнитель (executor)
  // "певец"
});
*/

const makeRequest2 = (url, onSucsses) => {
  return new Promise(fulfill => {
    fulfill('success');
  });
}

const sellerId2 = 154;
makeRequest(`/api/sellers/${sellerId2}`)
  .then((seller) => {
    const firstProductId = seller.productIds[0];

    return makeRequest(`/api/products/${firstProductId}`)
  })
  .then((product) => {
    const firstReviewId = product.reviewsIds[0];

    return makeRequest(`/api/reviews/${firstReviewId}`)
  })
  .then((review) => {
    const authorName = review.author.name;
  })
  .catch((error) => {
    console.log(error);    
  })




//************************************************* */ async/await - альтернатива
async function getSmth() { //js обернет возвращаемое значение в объект промиса
  return 'Hello';
}

getSmth()
  .then((smth) => {
    console.log(smth);  
  })

// const getSmth2 =  async () => {}

async function getSmth2() { //js обернет возвращаемое значение в объект промиса
  return new Promise((fulfill) => {
    setTimeout(() => {
      fulfill('hello')
    }, 3000)
  })
}
//await - js ждет выполнение промиса, затем идет дальше
const smth = await getSmth2()

console.log(smth);
// await используется на верхнем уровне функции -> либо оборачиваем весь код в функцию, либо делаем скрипт модульным


const makeRequest3 = async (url, onSucsses) => {
  return new Promise(fulfill => {
    fulfill('success');
  });
}

const sellerId3 = 154;

try {
  const seller = await makeRequest3(`/api/sellers/${sellerId3}`);
  const firstProductId = seller.productIds[0];

  const product = await makeRequest3(`/api/products/${firstProductId}`);
  const firstReviewId = product.reviewsIds[0];

  const review = makeRequest3(`/api/reviews/${firstReviewId}`);
  const authorName = review.author.name;
} catch (error) {
  console.log(error);  
}
