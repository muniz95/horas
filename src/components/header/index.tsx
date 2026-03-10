import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

  useEffect(() => {
    if (darkThemeEnabled) {
      document.body.classList.add('mdc-theme--dark');
      return;
    }

    document.body.classList.remove('mdc-theme--dark');
  }, [darkThemeEnabled]);

  const linkTo = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const currentPath = location.pathname;

  return (
    <>
      <header className={style.topbar}>
        <button type="button" className={style.iconButton} onClick={() => setDrawerOpen(true)}>
          menu
        </button>
        <h1 className={style.title}>React app</h1>
        <button type="button" className={style.iconButton} onClick={() => setSettingsOpen(true)}>
          settings
        </button>
      </header>

      {isDrawerOpen && (
        <div className={style.backdrop} onClick={() => setDrawerOpen(false)}>
          <aside className={style.drawer} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={`${style.drawerItem} ${currentPath === '/' ? style.selected : ''}`}
              onClick={() => linkTo('/')}
            >
              Home
            </button>
            <button
              type="button"
              className={`${style.drawerItem} ${currentPath.startsWith('/profile') ? style.selected : ''}`}
              onClick={() => linkTo('/profile')}
            >
              Profile
            </button>
          </aside>
        </div>
      )}

      {isSettingsOpen && (
        <div className={style.backdrop} onClick={() => setSettingsOpen(false)}>
          <section className={style.dialog} onClick={(event) => event.stopPropagation()}>
            <h2>Settings</h2>
            <label className={style.switchRow}>
              <input
                type="checkbox"
                checked={darkThemeEnabled}
                onChange={(event) => setDarkThemeEnabled(event.target.checked)}
              />
              Enable dark theme
            </label>
            <div className={style.dialogActions}>
              <button type="button" onClick={() => setSettingsOpen(false)}>
                OK
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
