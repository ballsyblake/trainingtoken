import React from "react";

class SmallTask extends React.Component {
	constructor() {
		super();
		this.state = { time: {}, seconds: 60, task: "", price: 0, show: false };
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
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
	}

	startTimer() {
		console.log(this);
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
			this.setState({
				seconds: 5,
			});
			this.setState({
				show: false,
			});
		}
	}

	render() {
		return this.state.show ? (
			<div className="tasksml">{this.state.time.s}</div>
		) : (
			<div className="tasksml" onClick={this.startTimer}>
				<p>{this.state.task}</p>
				<p>Reward: {this.state.price}</p>
				<img />
			</div>
		);
	}
}

export default SmallTask;
