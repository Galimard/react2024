import { useState, useEffect } from 'react';

const CardsAnimation = () => {
  const [isFanOut, setIsFanOut] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fanOutTimer = setTimeout(() => setIsFanOut(true), 100);
    const flipTimer = setTimeout(() => setIsFlipped(true), 1100);
    
    return () => {
      clearTimeout(fanOutTimer);
      clearTimeout(flipTimer);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '500px',
      height: '300px',
      margin: '50px auto',
    }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `
              translate(-50%, -50%)
              ${isFanOut 
                ? `rotate(${(i - 2) * 15}deg) translateX(${(i - 2) * 60}px)` 
                : `translateY(${i * 5}px)`
              }
            `,
            transition: 'transform 1s ease-in-out',
          }}
        >
          <div
            style={{
              transform: `${isFlipped ? 'rotateY(180deg)' : ''}`,
              transition: 'transform 0.6s ease-in-out',
              transformStyle: 'preserve-3d',
              width: '100px',
              height: '150px',
              position: 'relative',
            }}
          >
            {/* Рубашка */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '10px',
                backgroundColor: '#d11',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                border: '2px solid #333',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
              }}
            >
              ♠️ ♣️
            </div>
            
            {/* Лицевая сторона */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '10px',
                backgroundColor: '#fff',
                color: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                border: '2px solid #333',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                transform: 'rotateY(180deg)',
              }}
            >
              {['A', 'K', 'Q', 'J', '10'][i]}♦️
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsAnimation;

const PokerCombinationGenerator = () => {
  const [combination, setCombination] = useState('');

  const generateCombination = () => {
    const randomValue = Math.random() * 100;

    if (randomValue <= 86.8) {
      setCombination('Пара');
    } else if (randomValue <= 95.5) {
      setCombination('Фулл-хаус');
    } else if (randomValue <= 99.8) {
      setCombination('Каре');
    } else {
      setCombination('Флеш-рояль');
    }
  };

  return (
    <div>
      <h1>Генератор покерной комбинации</h1>
      <button onClick={generateCombination}>Сгенерировать комбинацию</button>
      {combination && <h2>Сгенерированная комбинация: {combination}</h2>}
    </div>
  );
};