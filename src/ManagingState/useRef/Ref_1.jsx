import { useRef } from 'react';

export default function Counter() {
  //useRef Не вызывает ререндеринг в отличие от useState, но запоминает определенную информацию
  // можно передавать любое значение: примитивы, объекты, массивы, дом-элементы
  let ref = useRef(0); //обычный js объект {current: 0}

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}

// 1. Когда храним айдишники таймаутов
// 2. Храним и манипулируем элементами дом-дерева
// 3. Любые объекты, которые не нужны для вычисления JSX