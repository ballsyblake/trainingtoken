import React from "react";
import { useEffect } from "react";
import trainingtoken from "./img/trainingtokens.png";
import { useState } from "react";

const url = "http://localhost:3000/";

function Coins(props) {
	return (
		<div className="navBar">
			<svg viewBox="0 0 100 80" width="40" height="40">
				<rect y="0" width="100" height="15" stroke="white" fill="white"></rect>
				<rect y="30" width="100" height="15" stroke="white" fill="white"></rect>
				<rect y="60" width="100" height="15" stroke="white" fill="white"></rect>
			</svg>
			<h1>Training Token</h1>
			<div className="coin">
				<img src={trainingtoken} alt="coin" />
				<h3>{props.coins}</h3>
			</div>
		</div>
	);
}

export default Coins;
