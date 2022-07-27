import plussign from "./img/plussign.png";
import "./App.css";
import Coins from "./coins.js";
import SmallTask from "./smallTask.js";
import LargeTask from "./largeTask.js";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/";
const coins = 0;
const show = false;


function App() {
	const [progress, setProgress] = useState({progress: []});
	useEffect(()=>{
		fetch(url + "progress")
			.then((response) => response.json())
			.then((data) => setProgress({ progress: data }));
	}, []);
	let temp = progress["progress"];
	if(temp.length >0)
		console.log(temp[0]);
	return (
		<div className="App" id="App">
			<Coins />
			<div className="mainContent">
				<div className="minutes">
					<SmallTask />
					<SmallTask />
					<SmallTask />
				</div>
				<div className="dailies">
					<LargeTask />
					<LargeTask />
					<LargeTask />
				</div>
			</div>
		</div>
	);
}

function AddCoins(amount) {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(amount),
	};
	fetch(url + "coins", requestOptions)
		.then((response) => response.json())
		.then((data) => coins);
}

export default App;
