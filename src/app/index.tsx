import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import NotFound from '../routes/404';
import Home from '../routes/home';
import Profile from '../routes/profile';
import { store } from '../redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div id="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:user" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
