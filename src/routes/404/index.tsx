import style from './style.module.css';

export default function NotFound() {
  return (
    <div className={`${style.home} page`}>
      <div>
        <div className={style.cardHeader}>
          <h2>404! Page not found.</h2>
        </div>
        <div className={style.cardBody}>
          Looks like the page you are trying to access, doesn't exist.
        </div>
      </div>
    </div>
  );
}
