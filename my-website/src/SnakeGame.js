import React, { useState, useEffect } from 'react';


const initialSnake = [[0, 0], [0, 1], [0, 2]];
const initialDirection = { x: 1, y: 0 };
const initialFood = [5, 5];

const pxX = window.innerWidth;
const pxY = window.innerHeight;
const gridSizeX = 30;
const gridSizeY = 30;
const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(initialDirection);
  const [gameOver, setGameOver] = useState(false);


  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  
  const cellSizeX = dimensions.width / gridSizeX;
  const cellSizeY = dimensions.height/gridSizeY;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Move the snake
  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      // Create a new snake array
      const newSnake = [...snake];
      // Calculate the new head position
      const head = [newSnake[newSnake.length - 1][0] + direction.x, newSnake[newSnake.length - 1][1] + direction.y];
      // Add the new head to the snake
      newSnake.push(head);
      // Check for collision with food
      if (head[0] === food[0] && head[1] === food[1]) {
        // Generate new food
        setFood([Math.floor(Math.random() * gridSizeX), Math.floor(Math.random() * gridSizeY)]);
      } else {
        // Remove the tail
        newSnake.shift();
      }
      // Check for collision with walls or self
      if (
        head[0] < 0 ||
        head[1] < 0 ||
        head[0] >= gridSizeX ||
        head[1] >= gridSizeY ||
        newSnake.slice(0, -1).some(segment => segment[0] === head[0] && segment[1] === head[1])
      ) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver]);

  if (gameOver) {
    return window.location.reload();
    //return <div>Game Over! Press <button onClick={() => window.location.reload()}>Restart</button> to play again.</div>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSizeX}, 1fr)`,
      gridTemplateRows: `repeat(${gridSizeY}, 1fr)`,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1, // Send the game to the background
     }}>
      {Array.from({ length: gridSizeX * gridSizeY }, (_, k) => {
        const x = k % gridSizeX;
        const y = Math.floor(k / gridSizeY);
        const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
        const isFood = food[0] === x && food[1] === y;

        return (
          <div
            key={k}
            style={{
              width: `${cellSizeX}px`,
              height: `${cellSizeY}px`,
              backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'transparent',
            }}
          />
        );
      })}
    </div>
  );
};

export default SnakeGame;
