import { h, Component } from 'preact';
import Appointment from '../../components/appointment';
import 'preact-material-components/Button/style.css';
import { connect } from 'preact-redux';
import style from './style';

class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home route</h1>
				{
					this.props.appointments
						? this.props.appointments.map(app =>
							<Appointment />
						)
						: <h2>Nenhum apontamento encontrado!</h2>
				}
			</div>
		);
	}
}

function mapStateToProps (state) {
	const { appointments } = state;
	return {
		appointments
	};
}

export default connect(mapStateToProps, null)(Home);
