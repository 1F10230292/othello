import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 0, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
  ]);
  const directions = [
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    let isPlace = false;
    for (const direction of directions) {
      let isPassAnotherColor = false;
      for (let n = 1; n < 8; n += 1) {
        if (
          board[y + n * direction[0]] === undefined ||
          board[y + n * direction[0]][x + n * direction[1]] === undefined
        ) {
          break;
        } else if (board[y + n * direction[0]][x + n * direction[1]] === 0) {
          break;
        } else if (board[y + n * direction[0]][x + n * direction[1]] === 3 - turnColor) {
          isPassAnotherColor = true;
          continue;
        } else if (
          board[y + n * direction[0]][x + n * direction[1]] === turnColor &&
          isPassAnotherColor
        ) {
          for (let m = 1; m <= n; m += 1) {
            newBoard[y + (n - m) * direction[0]][x + (n - m) * direction[1]] = turnColor;
          }
          isPlace = true;
          break;
        }
      }
    }
    if (isPlace) {
      setTurnColor(3 - turnColor);
    }
    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
