import { useEffect } from 'react';

export default function ChatRoom() {
  useEffect(() => { 
    const connection = createConnection();
    connection.connect();

    return () => { // cleanup функция, запускается при unmount компонента
      connection.disconnect();
    }
  }, []); // запускается при mount компонента
  return <h1>Welcome to the chat!</h1>;
}


function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}