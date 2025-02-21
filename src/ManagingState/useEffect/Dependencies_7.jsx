// 1. Зависимости должны соответствовать коду

import { createContext, useContext, useEffect, useState } from "react";

function ChatRoom({ roomId }) {
  useEffect(() => {
    const roomId = 'music'; //объявить в эффекте переменную, сделать нереактивной
    const serverUrl = 'https://localhost:1234' + roomId;

    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    return () => connection.disconnect();
  }, []); 
  // сначала пишем тело эффекта, затем пишем зависимости. Если нас не устраивает список зависимостей, возвращаемся к 1 шагу
  
  return <h1>{roomId}</h1>
}

function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log('✅ Connecting...' + roomId);
    },
    disconnect() {
      console.log('❌ Disconnected.' + roomId);
    }
  };
}



//***************************** */ а должна ли быть эта логика в эффекте?
const ThemeContext = createContext('dark');

function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!', theme);
    }
  }, [submitted]);

  function handleSubmit() {
    setSubmitted(true);
  }

  // ...
}
// переносим в обработчик событий
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ Good: Event-specific logic is called from event handlers
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }  

  // ...
}




//**************************не делает ли наш эффект несколько не связанных друг с другом вещей?
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 Avoid: A single Effect synchronizes two independent processes
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ All dependencies declared
}
// отдельные useEffect
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ All dependencies declared

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]); // ✅ All dependencies declared
}


//************************** */ читаем ли мы какое-то состояние в эффекте, чтобы получить следующее состояние?
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const serverUrl = 'https://localhost:1234' + roomId;

    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]);
}
// испльзуем функцию-update, а не состояние
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const serverUrl = 'https://localhost:1234' + roomId;
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
}




//*********************************меняется ли какое=то значение у зависимостей случайно или ненамеренно?
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  const serverUrl = 'https://localhost:1234' + roomId;

  // const options = { serverUrl, roomId };

  useEffect(() => {
    const options = { serverUrl, roomId }; //1. переместить options в эффект
    const connection = createConnection2(options);
    connection.connect();

    return () => connection.disconnect();
  }, [serverUrl, roomId]);
}
// 2. превращаем в статичное значение
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  const serverUrl = 'https://localhost:1234' + roomId;

  function createOptions() { //статичные значения, не реактивные
    return {
      serverUrl: 'url', 
      roomId: 'music'
    }
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection2(options);
    connection.connect();

    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
}

//другой пример
function ChatRoom({ options }) { //приходит от родителя
  const [messages, setMessages] = useState([]);

  const { roomId, serverUrl } = options;

  useEffect(() => {
    const connection = createConnection2({ roomId, serverUrl });
    connection.connect();

    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
}

function createConnection2({serverUrl, roomId}) { //object
  return {
    connect() {
      console.log('✅ Connecting...' + roomId);
    },
    disconnect() {
      console.log('❌ Disconnected.' + roomId);
    }
  };
}