import plussign from "./img/plussign.png";
import "./App.css";
import Coins from "./coins.js";
import SmallTask from "./smallTask.js";
import LargeTask from "./largeTasks.js";
import { useState } from "react";

const url = "http://localhost:3000/";
const coins = 0;
const show = false;

function App() {
	const [progress, setProgress] = useState({});
	const requestOptions = {
		method: "GET",
	};
	fetch(url + "progress", requestOptions)
		.then((response) => response.json())
		.then((data) => setProgress({ data }));
	console.log(progress);
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
