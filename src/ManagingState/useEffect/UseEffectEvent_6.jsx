import { useEffect, useEffectEvent } from 'react';
// отличия эффекта от обработчиков событий:
// эффект запускается каждый раз когда требуется синхронизация (меняется значение зависимых параметров); событие - в ответ на конкретное взаимодействие
// логика внутри обработчика событий не является реактивной (не зависит от реакта и переменных)

//проблемы, когда смешиваем реактивную логику с нереактивной
//useEffectEvent - экспериментальный
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', ()=> {
      // showNotification('Connected', theme); //было
      onConnected(); //стало
    });

    return () => connection.disconnect();;
  }, [roomId]); //эта ошибка должна уйти в экспериментальной версии реакта
  
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

