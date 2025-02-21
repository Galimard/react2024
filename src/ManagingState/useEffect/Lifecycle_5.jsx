import { useEffect } from 'react';

// https://skr.sh/sUHjifgkzAl lifecycle

// mount - выводится на экран
// update - получает новые пропсы/меняется состояние
// unmount - исчезает с экрана

// useEffect может либо что-то синхронизировать, либо перестать это делать. При маунте он начинает с-цию ([]), при анмаунте - прекращает (cleanup)

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  //2. Затем стартует синхронизация эффекта
  useEffect(() => {
    //старт/начало синхронизации
    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    //стоп, конец синхронизации. Произойдет когда компонент анмаунтится или как только изменится значение зависимостей
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  
  return <h1>{roomId}</h1> //1. Сначала отобразится в UI
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