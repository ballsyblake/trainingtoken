import plussign from "./img/plussign.png";
import "./App.css";
import Coins from "./coins.js";
import SmallTask from "./smallTask.js";
import LargeTask from "./largeTask.js";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/";
const show = false;
let dailies = 0;

function App() {
	const [progress, setProgress] = useState({});
	const tasks = [];

	const addCoins = (newcoins, dailiesAdd) => {
		let updatedCoins = progress.coins + newcoins;
		let currTime = new Date();
		dailies += dailiesAdd;
		if(dailies == 3){
			setProgress({coins: updatedCoins, dailies1: true, dailies2: true, dailies3: true, timeOf: currTime});
			postData(url+'progress', {coins: updatedCoins, dailies1: true, dailies2: true, dailies3: true, timeOf: currTime});
		}
		else if(dailies == 2){
			setProgress({coins: updatedCoins, dailies1: true, dailies2: true, dailies3: false, timeOf: currTime});
			postData(url+'progress', {coins: updatedCoins, dailies1: true, dailies2: true, dailies3: false, timeOf: currTime});
		}
		else if(dailies == 1){
			setProgress({coins: updatedCoins, dailies1: true, dailies2: false, dailies3: false, timeOf: currTime});
			postData(url+'progress', {coins: updatedCoins, dailies1: true, dailies2: false, dailies3: false, timeOf: currTime});
		}
		else if(dailies == 0){
			setProgress({coins: updatedCoins, dailies1: false, dailies2: false, dailies3: false, timeOf: currTime});
			postData(url+'progress', {coins: updatedCoins, dailies1: false, dailies2: false, dailies3: false, timeOf: currTime});
		}
		else return;
	};

	const addCoinsSml = (newcoins) => {
		let updatedCoins = progress.coins + newcoins;
		let currTime = new Date();
		setProgress({coins: updatedCoins, dailies1: progress.dailies1, dailies2: progress.dailies2, dailies3: progress.dailies3, timeOf: currTime});
		console.log(progress);
		postData(url+'progress', {coins: updatedCoins, dailies1: progress.dailies1, dailies2: progress.dailies2, dailies3: progress.dailies3, timeOf: currTime});
	};

	const filterData = (unfilteredData) => {
		let temp = 0;
		unfilteredData.forEach((el) => {
			if(temp.timeOf > el.timeOf)	return;
			temp = el;
		});
		return temp;
	};
	
	useEffect(() => {
		fetch(url + "progress")
			.then((response) => response.json())
			.then((data) => setProgress(filterData(data)));
	}, []);
	useEffect(() => {
		fetch(url + "tasks")
			.then((response) => response.json())
			.then((data) => setProgress(filterData(data)));
	}, []);

	return (Object.keys(progress).length > 0) ? (
		<div className="App" id="App">
			<Coins coins={progress.coins} />
			<div className="mainContent">
				<div className="minutes">
					<SmallTask callback={addCoinsSml} />
					<SmallTask callback={addCoinsSml} />
					<SmallTask callback={addCoinsSml} />
				</div>
				<div className="dailies">
					<LargeTask callback={addCoins} show={progress["dailies1"]} timeOf={progress["timeOf"]} />
					<LargeTask callback={addCoins} show={progress["dailies2"]} timeOf={progress["timeOf"]} />
					<LargeTask callback={addCoins} show={progress["dailies3"]} timeOf={progress["timeOf"]} />
				</div>
			</div>
		</div>
	) : (<div>nothing</div>);
}

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
	  //mode: 'cors', // no-cors, *cors, same-origin
	  //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  //credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  //redirect: 'follow', // manual, *follow, error
	  //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
  }

export default App;
