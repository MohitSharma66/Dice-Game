import Dice from './Dice.jsx';
import './LuckyN.css';

export default function LuckyN({target, die, turn, score, disabled, change, roll}) {
    let sum = 0;
    for(let i = 0; i < die; i++) {
        sum += score[i];
    }
    const win = sum === target;
    
    const reset = () => {
        if(turn && !disabled) {
            roll();
            change();
        }
    };

    return (
        <div style={{color: win ? "green": ""}}>
            <h1>Lucky{target} Game</h1>
            {win && <h3>Congrats You Win!!!</h3>}
            <Dice score={score}/>
            <button style={{color: win ? "green": "", border: "3px solid black", borderRadius: "15px", opacity: turn ? 1 : 0.5 }} disabled={disabled || !turn} onClick={reset}>Roll Again!</button>
        </div>
    );
}
