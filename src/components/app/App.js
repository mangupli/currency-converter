import { useState, useRef, useEffect } from "react";
import ConverterService from "../../services/ConverterService";

const App = (props) => {
	const [value, setValue] = useState(props.amount);
	const [result, setResult] = useState(null);
	const [currency, setCurrency] = useState(null);

	const converterService = new ConverterService();   
	
	let activeButton = useRef(null);

	useEffect(()=>{
	  activeButton.current.classList.add('controls__button_selected');
	});

	function onClick(e, currency){
/*         converterService.convert('RUB', currency, value)
		.then(res => {
			console.log(res);
			setResult(res.result.toFixed(3));
		})
		.catch(error => console.log(error)) */
		if(e.target){
		  if(activeButton.current){
			activeButton.current.classList.remove('controls__button_selected');
		  }
		  activeButton.current = e.target;
		  setCurrency(e.target.getAttribute('data-currency'));
		  e.target.classList.add('controls__button_selected');
		}
	}

	const onValueChange = (e) =>{
		setValue(e.target.value);
		setResult(null);
	}

	useEffect(()=>{
		converterService.convert('RUB', currency, value)
		.then(res => {
			console.log(res);
			setResult(res.result.toFixed(3));
		})
		.catch(error => console.log(error))
	}, [value, currency]);

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
		  <button
		  	ref={activeButton}
			className="controls__button"
			onClick={(e)=>onClick(e, 'USD')}
			data-currency="USD">USD</button>
		  <button
		  	className="controls__button"
			onClick={(e)=>onClick(e, 'EUR')}
			data-currency="EUR">EUR
			</button>
		  <button
		  	className="controls__button"
			onClick={(e)=>onClick(e, 'INR')}
			data-currency="INR"
			>INR</button>
		  <button className="controls__button" onClick={reset}>RESET</button>
		</div>
	  </div>
	)
  }

  export default App;
