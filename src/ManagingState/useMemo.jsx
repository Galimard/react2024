import { button } from 'framer-motion/client';
import { useState, useMemo, useCallback } from 'react';
//Правила реакта:
// 1. Компоненты и хуки должны быть чистыми
//          - мы всегда получаем один и тот же результат каждый раз, когда запускаем функцию с одними и теми же данными
//          - в разметке отсутствуют side эффекты (запросы, таймеры)
//          - переменные вне функции не изменяются
// 2. Реакт сам вызывает ваши компоненты и хуки
//          - обращаемся к компоненту как к тегу, а не вызываем как функцию
//          - не изменяем хуки динамически 
//          - не используем хуки динамически
// 3. Правила хуков
//          - вызываем хуки только на верхнем уровне
//          - вызываем хуки только из реакт-функций


// useMemo - запоминает результаты вычисления функции (кэширует)
// const cachedValue = useMemo(calculateValue, dependencies)
// https://www.youtube.com/watch?v=IbiC1pBK0Hc&list=PLQLbytwzjdVDXjZoPd2v_vLYCzFXjxotz&index=15

// 1. Пропуск дорогостоящих перерасчетов до тех пор, пока не изменятся его зависимости

export default function Counter() {
  console.log('render Counter');  
  const [number, setNumber] = useState(0);

  const setValueHandler = () => {
    setNumber(number => number + 1);
  }

  // const addValue = number + 20;
  const addValue = useMemo(() => {
    return number + 20; //запоминается этот результат []
  }, []);

  return (
    <>
      <h1>{number}</h1>
      <CounterPlusOne plusOne={setValueHandler} />
      {/* <button onClick={setValueHandler}>+1</button> */}
      <span>{addValue}</span>
    </>
  )
}

const CounterPlusOne = ({plusOne}) => {
  return <button onClick={plusOne}>+1</button>
}

// js имеет стек выполнения функций - глобальная анонимная ф. (глобальный контекст выполнения)  -> наша ф.
// функция выполняется и исчезает из стека, данные из нее запоминает реакт, чтобы потом воспроизвести в браузере

// useCallback - мемоизация для функций
const [counter, setCounter] = useState(0);
const increase = useCallback(
  () => setCounter(s => s + 1),
  [setCounter] // в зависимости от [] обновлять функцию или нет
)

// в основном useCallback используется в сочетании с memo
const [counter, setCounter] = useState(0);
const increase = useCallback(
  () => setCounter(s => s + 1),
  [setCounter] // в зависимости от [] обновлять функцию или нет
)
//memo - к компонентам 
//const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
const FancyButton = React.memo(({ onClick, children }) => { //реакт повторно вызывает этот компонент(функции), только если изменится onClick/children
  return <button onClick={onClick}>{children}</button>
})