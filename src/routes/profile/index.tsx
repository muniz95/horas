import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.css';

export default function Profile() {
  const { user } = useParams();
  const profileUser = user ?? 'me';

  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={`${style.profile} page`}>
      <h1>Profile: {profileUser}</h1>
      <p>This is the user profile for a user named {profileUser}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>
          Click Me
        </button>{' '}
        Clicked {count} times.
      </p>
    </div>
  );
}
