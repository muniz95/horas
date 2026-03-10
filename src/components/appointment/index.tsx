import { useEffect, useState, type ChangeEvent } from 'react';
import type { Appointment as AppointmentType } from '../../redux/types';
import style from './style.module.css';

interface AppointmentProps {
  appointment: AppointmentType;
}

export default function Appointment({ appointment }: AppointmentProps) {
  const [formData, setFormData] = useState<AppointmentType>(appointment);

  useEffect(() => {
    setFormData(appointment);
  }, [appointment]);

  const setContent = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof AppointmentType;
    setFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value
    }));
  };

  const save = () => {
    console.log('appointment', formData);
  };

  return (
    <div className={style.container}>
      <input type="date" value={formData.startDate} name="startDate" onChange={setContent} />
      <input type="time" value={formData.startTime} name="startTime" onChange={setContent} />
      <input type="date" value={formData.endDate} name="endDate" onChange={setContent} />
      <input type="time" value={formData.endTime} name="endTime" onChange={setContent} />
      <button type="button" onClick={save}>
        Salvar
      </button>
    </div>
  );
}
