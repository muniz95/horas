import { h, Component } from 'preact';
import style from './style.css';

export default class Appointment extends Component {
	setContent = (evt) => {
		const fieldId = evt.target.id;
		const fieldValue = evt.target.value;
		this.setState({ [fieldId]: fieldValue });
	}

	save = (evt) => {
		console.log(this.state);
		// this.setState({

		// });
	}

	render() {
		return (
			<div class={style.container}>
				<input type="date" id="startDate" onChange={this.setContent} />
				<input type="time" id="startTime" onChange={this.setContent} />
				<input type="date" id="endDate" onChange={this.setContent} />
				<input type="time" id="endTime" onChange={this.setContent} />
				<button onClick={this.save} >Salvar</button>
			</div>
		);
	}
}