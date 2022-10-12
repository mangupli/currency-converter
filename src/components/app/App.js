import { useState } from "react";
import ConverterService from "../../services/ConverterService";

const App = (props) => {
    const [value, setValue] = useState(props.amount);

    const [result, setResult] = useState(null);

    const converterService = new ConverterService();    

    function onClick(currency){
        converterService.convert('RUB', currency, value)
        .then(res => {
            console.log(res);
            setResult(res.result.toFixed(3));
        })
        .catch(error => console.log(error))
    }

    function onValueChange(e){
        setValue(e.target.value);
        setResult(null);
    }

    function reset(){
        setResult(null);
        setValue(0);

    }
   
    return (
      <div className="app">
        
        <div className="input">
            <input type="number" value={value} onChange={onValueChange}/>
        </div>
        <div className="counter">{result}</div>
        <div className="controls">
          <button className="controls__button" onClick={()=>onClick('USD')}>USD</button>
          <button className="controls__button" onClick={()=>onClick('EUR')}>EUR</button>
          <button className="controls__button" onClick={()=>onClick('INR')}>INR</button>
          <button className="controls__button" onClick={reset}>RESET</button>
        </div>
      </div>
    )
  }

  export default App;
