import { useState, useRef, useEffect } from 'react';

//два типа логики: рендер компонента (верхний уровень) и обработчики

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => { //без массива - на каждый рендер, c [] - при первом рендере, с полным массивом - при изменении зависимостей
    if (isPlaying) {
      ref.current.play();  // Calling these while rendering isn't allowed.
    } else {
      ref.current.pause(); // Also, this crashes.
    }
  }, [isPlaying]); 

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}

// когда использовать (когда происходит взаимодествие с внешними апи - дом, виджет, сетевые запросы)

// 1. non-React widgets 
// useEffect(() => {
//   const map = mapRef.current;
//   map.setZoomLevel(zoomLevel);
// }, [zoomLevel]);

// 2. Subscribing to events 
// useEffect(() => {
//   function handleScroll(e) {
//     console.log(window.scrollX, window.scrollY);
//   }
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);

// 3. Triggering animations 
// useEffect(() => {
//   const node = ref.current;
//   node.style.opacity = 1; // Trigger the animation
//   return () => {
//     node.style.opacity = 0; // Reset to the initial value
//   };
// }, []);

// 4. Fetching data
// useEffect(() => {
//   let ignore = false;
//   async function startFetching() {
//     const json = await fetchTodos(userId);
//     if (!ignore) {
//       setTodos(json);
//     }
//   }
//   startFetching();
//   return () => {
//     ignore = true; // abort fetch
//   };
// }, [userId]);

// 5. Sending analytics
// useEffect(() => {
//   logVisit(url); // Sends a POST request
// }, [url]);