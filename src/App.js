import plussign from "./img/plussign.png";
import "./App.css";
import Coins from "./coins.js";
import SmallTask from "./smallTask.js";
import LargeTask from "./largeTask.js";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/";
const show = false;

function App() {
	const [coins, setCoins] = useState(0);

	const addCoins = (newcoins) => {
		console.log(coins);
		console.log(newcoins);
		setCoins(coins + newcoins);
	};

	useEffect(() => {
		fetch(url + "progress")
			.then((response) => response.json())
			.then((data) => setCoins(data[0].coins));
	}, []);
	console.log(coins);

	return (
		<div className="App" id="App">
			<Coins coins={coins} />
			<div className="mainContent">
				<div className="minutes">
					<SmallTask callback={addCoins} />
					<SmallTask callback={addCoins} />
					<SmallTask callback={addCoins} />
				</div>
				<div className="dailies">
					<LargeTask callback={addCoins} />
					<LargeTask callback={addCoins} />
					<LargeTask callback={addCoins} />
				</div>
			</div>
		</div>
	);
}

export default App;
