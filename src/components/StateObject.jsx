import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  return (
    <div
      onPointerMove={e => {
        // position.x = e.clientX; //неправильно
        // position.y = e.clientY;

        setPosition({
          x: e.clientX,
          y: e.clientY
        })
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

//primitive - значение неизменяемое, readonly, можно только перезаписать значение
// const number = 0; 
// const word = '';
// const isActive = true;

// //object - изменяемое (мутация)
// const hero = { name: 'bla', str: 16 }

// const newHero = { ...hero } //создать копию объекта
// newHero.name = 'blabla';
// newHero.str = 25;
// console.log(hero, newHero); //{ name: 'bla', str: 16 }, { name: 'blabla', str: 25 }

// const newHeroName = { ...hero, name: 'name' }; //скопировать + часть нового


export function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({ ...person, [e.target.name]: e.target.value });
  }

  // function handleFirstNameChange(e) {
  //   // person.firstName = e.target.value;

  //   setPerson({ ...person, firstName: e.target.value })
  // }

  // function handleLastNameChange(e) {
  //   // person.lastName = e.target.value;

  //   setPerson({ ...person, lastName: e.target.value })
  // }

  // function handleEmailChange(e) {
  //   // person.email = e.target.value;

  //   setPerson({ ...person, email: e.target.value })
  // }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
