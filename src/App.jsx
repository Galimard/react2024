import './App.css'
import Avatar from './components/Avatar';
import List from './components/StateArray';
import MovingDot, { Form } from './components/StateObject';
import Page from './ManagingState/useContext/Page';
// import CardsAnimation from './Cards';

const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];

function Card({ children }) { //props = children
  return (
    <div className="card">
      {children}
    </div>
  );
}

function App() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const listItems = chemists.map((person, index) =>
    <li key={index}>
       <p>
         <b>{person.name}:</b>
         {' ' + person.profession + ' '}
         known for {person.accomplishment}
       </p>
    </li>
  );

  return (
    <>
      <Card>
        <Avatar
          size={100}
          person={{ 
            name: 'Katsuko Saruhashi',
            imageId: 'YfeOqp2'
          }}
        />
      </Card>
      <ul>{listItems}</ul>
      <Form />
      Array
      <List />

      {/* Context    */}
      <Page /> 

      {/* StateObject */}
      <MovingDot />  
    </>    
  );
}

export default App
