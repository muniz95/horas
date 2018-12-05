import { h, Component } from 'preact';
import style from './style.css';

export default class Appointment extends Component {
	setContent = (evt) => {
		const fieldId = evt.target.id;
		const fieldValue = evt.target.value;
		this.setState({ [fieldId]: fieldValue });
	}

	save = (evt) => {
		console.log('props', this.props);
		// this.setState({
			
		// });
	}
		
	render(props) {
		console.log('props', props);
		return (
			<div class={style.container}>
				<input type="date" value={props.appointment.startDate} id="startDate" onChange={this.setContent} />
				<input type="time" value={props.appointment.startTime} id="startTime" onChange={this.setContent} />
				<input type="date" value={props.appointment.endDate} id="endDate" onChange={this.setContent} />
				<input type="time" value={props.appointment.endTime} id="endTime" onChange={this.setContent} />
				<button onClick={this.save} >Salvar</button>
			</div>
		);
	}
}