import React from "react";

const url = "http://localhost:3000/";

class LargeTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = { time: {}, seconds: 1, task: "", price: 6, show: props.show };
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
		this.today = new Date();
		this.timeInSeconds =
			this.today.getHours() * 3600 +
			this.today.getMinutes() * 60 +
			this.today.getSeconds();
	}

	secondsToTime(secs) {
		let hours = Math.floor(secs / (60 * 60));

		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);

		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		let obj = {
			h: hours,
			m: minutes,
			s: seconds,
		};
		return obj;
	}

	componentDidMount() {
		let timeLeftVar = this.secondsToTime(this.state.seconds);
		this.setState({ time: timeLeftVar });
		// Compare current time and convert to seconds
		let currentSeconds = 86400 - this.timeInSeconds;
		this.setState({
			seconds: currentSeconds,
		});
		let temp = String(this.props.timeOf).substring(0,10);
		console.log(temp);
		if(this.state.show && temp == this.today.toLocaleDateString("fr-CA")) {
			this.props.callback(0, 1);
			if (this.timer == 0 && this.state.seconds > 0) {
				this.forceUpdate();
				this.setState({
					show: true,
				});
				this.timer = setInterval(this.countDown, 1000);
			}
		}else{
			this.props.callback(0, 0);
			this.forceUpdate();
			this.setState({
				show: false,
			});
		}
		setTimeout(function() { //Start the timer
			this.setState({task: this.props.task.task,
				price: this.props.task.reward,}) //After 1 second, set render to true
		}.bind(this), 1000);
	}

	startTimer() {
		this.props.callback(this.state.price, 1);
		if (this.timer == 0 && this.state.seconds > 0) {
			this.forceUpdate();
			this.setState({
				show: true,
			});
			this.timer = setInterval(this.countDown, 1000);
		}
	}

	countDown() {
		// Remove one second, set state so a re-render happens.
		let seconds = this.state.seconds - 1;
		this.setState({
			time: this.secondsToTime(seconds),
			seconds: seconds,
		});

		// Check if we're at zero.
		if (seconds == 0) {
			clearInterval(this.timer);
			this.timer = 0;
			// Compare current time and convert to seconds
			let currentSeconds = 86400 - this.timeInSeconds;
			
			this.setState({
				seconds: currentSeconds,
				show: false,
				task: this.props.task.task,
				price: this.props.task.reward,
			});
		}
	}

	render() {
		return this.state.show ? (
			<div className="tasklrg">
				{this.state.time.h}:{this.state.time.m}:{this.state.time.s}
				<br />
			</div>
		) : (
			<div className="tasklrg" onClick={this.startTimer}>
				<p>{this.state.task}</p>
				<p>Reward: {this.state.price}</p>
			</div>
		);
	}
}

export default LargeTask;
