import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);
  //Вызов компонента - рендер (снимок (snapshot), статичный в рамках текущего рендера). 
  //реакт ждет, пока выполнится весь код в обработчиках событий, только потом меняет состояние (batching - пакетная обработка)
  // очередь коллбэков https://skr.sh/sUFe2GfEN8Y https://react.dev/learn/queueing-a-series-of-state-updates
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1); //"замени"
        setNumber(number + 1); //0
        setNumber(number + 1); //0
        // setNumber(n => n + 1); //чтобы получить новое состояние в обработчике, "обнови"


        // setNumber(number + 5);
        // setNumber(n => n + 1); //6


        // setNumber(number + 5);
        // setNumber(n => n + 1);
        // setNumber(42); //42
      }}>+3</button>
    </>
  )
}
