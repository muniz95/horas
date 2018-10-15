import { h, Component } from 'preact';
import Appointment from '../../components/appointment';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home route</h1>
				<Appointment />
			</div>
		);
	}
}
