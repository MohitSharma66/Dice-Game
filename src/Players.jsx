import React from 'react';
import Confetti from 'react-confetti';
import LuckyN from './LuckyN.jsx';

export default function Players({num, target, die}) {
    const initial = () => {
        const arr = [];
        arr.push(true);
        for(let i = 1; i < num; i++) {
            arr.push(false);
        }
        return arr;
    };

    const initialScores = () => {
        const arr = [];
        for(let i = 0; i < num; i++) {
            const scores = [];
            for(let j = 0; j < die; j++) {
                scores.push(Math.floor(Math.random() * 6) + 1);
            }
            arr.push(scores);
        }
        return arr;
    };

    const checkWinner = (arr) => {
        let sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum === target;
    };

    const [scores, setScores] = React.useState(initialScores);
    const [players, setPlayers] = React.useState(initial);
    const [win, setWin] = React.useState(false);

    const allFalse = (arr) => arr.every((value) => !value);

    const change = (id) => {
        setPlayers((players) => {
            const newPlayers = players.map((value, i) => {
                if (i === id || i === id + 1) {
                    return !value;
                }
                return value;
            });
    
            if (allFalse(newPlayers)) {
                return initial();
            }
    
            return newPlayers;
        });
    };
    

    const random = (num) => {
        const arr = [];
        for(let i = 0; i < num; i++) {
            arr.push(Math.floor(Math.random() * 6) + 1);
        }
        return arr;
    };

    const roll = (idx) => {
        setScores((scores) => {
            // Update the scores for the specific player whose turn it is
            const newScores = scores.map((score, i) => {
                if (i === idx) {
                    return random(die);
                }
                return score;
            });
    
            // Check if the updated player has won 
           const winner = checkWinner(newScores[idx]);

           if(winner) {
            setWin(true);
           }
    
            return newScores;
        });
    };
    
    const reset = () => {
        const newScores = initialScores();
        setScores(newScores);
        //React does not re-render just after setScores it runs the code beneath it too thus we use newScores
        //Only checking the updated player causes issues as random rolls set up by initial scores can end
        //up giving winning scores and thus we would have to wait till we reach that person's roll to determine whether he won or not
        //Do this logic after setting initialScores
        //Using newScores because it somehow using old state values
        let l = 0;
        for(let i = 0; i < num; i++) {
            if(checkWinner(newScores[i])) {
                setWin(true);
                l = 1;
                break;
            }
        }
        if(l != 1) {
            setWin(false);
        }
        setPlayers(initial);
    };

    return (
      <>
        {win && <Confetti />}
        {players.map((player, i) => {
            return <div key={i}>
                <h1 style={{color: checkWinner(scores[i]) ? "green": "black"}}>Player {i + 1}</h1>
                <hr />
                <LuckyN target={target} die={die} turn={player} score={scores[i]} disabled={win} change={() => change(i)} roll={() => roll(i)}/>
            </div>
        })}
        <hr />
        <button style={{marginTop: "1rem", border: "3px solid black", borderRadius: "15px"}} onClick={reset}>Reset Game!</button>
      </>
    );
}
