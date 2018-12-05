import { h, Component } from 'preact';
import Appointment from '../../components/appointment';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import { addAppointment } from '../../redux/actions';
import { connect } from 'preact-redux';
import style from './style';

class Home extends Component {
	addAppointment = () => {
		this.props.dispatchAddAppointment();
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home route</h1>
				{
					this.props.appointments
						? this.props.appointments.map(app =>
							<Appointment appointment={app} />
						)
						: <h2>Nenhum apontamento encontrado!</h2>
				}
				<div class={style.buttonRow}>
					<Button ripple raised className="mdc-theme--primary-bg" onClick={this.addAppointment}>
						+
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { appointments } = state;
	return {
		appointments
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatchAddAppointment: () => {
		dispatch(addAppointment());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
