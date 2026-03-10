import { useDispatch, useSelector } from 'react-redux';
import Appointment from '../../components/appointment';
import { addAppointment } from '../../redux/actions';
import type { AppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/reducers';
import style from './style.module.css';

export default function Home() {
  const appointments = useSelector((state: RootState) => state.appointments);
  const dispatch = useDispatch<AppDispatch>();

  const onAddAppointment = () => {
    dispatch(addAppointment());
  };

  return (
    <div className={`${style.home} page`}>
      <h1>Home route</h1>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Appointment
            key={`${appointment.startDate}-${appointment.startTime}-${index}`}
            appointment={appointment}
          />
        ))
      ) : (
        <h2>Nenhum apontamento encontrado!</h2>
      )}
      <div className={style.buttonRow}>
        <button type="button" onClick={onAddAppointment}>
          +
        </button>
      </div>
    </div>
  );
}
