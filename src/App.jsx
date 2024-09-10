import './App.css';
import Players from './Players.jsx';

function App() {

  return (
    <div>
      <Players num={3} target={10} die={3}/>
    </div>
  )
}

export default App;
