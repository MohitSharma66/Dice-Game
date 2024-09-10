import Die from './Die.jsx';
import './LuckyN.css';

export default function Dice({score}) {
    return (
        <div className="dice">
            {score.map((value, index) => {
                return <Die key={index} score={value} />
            })}
        </div>
    )
}