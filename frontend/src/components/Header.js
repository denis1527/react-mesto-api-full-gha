import logo from '../images/header-logo.svg';
import { Route, Link, useHistory  } from 'react-router-dom';

function Header ({ userData }) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Mesto" className="header__logo" />
      <Route exact path="/main">
        <div className="header__wrapper">
          <p className="header__user">{userData.email}</p>
          <button className="header__logout" onClick={signOut}>Выйти</button>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link className="header__auth-link" to="sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__auth-link" to="sign-up">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
