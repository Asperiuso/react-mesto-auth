import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../images/header_logo.svg';

function Header({
  email,
  isLoggedIn,
  onSignOut
}) {

  const currentLocation = useLocation();
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [buttonInfo, setButtonInfo] = useState({ path: '', textOfButton: '' });

  function handleSignOut() {
    setIsBurgerClicked(false);
    onSignOut();
  }

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked);
  };

  useEffect(() => {
    if (currentLocation.pathname === '/sign-in') {
      setButtonInfo({ path: 'sign-up', textOfButton: 'Зарегистрироваться' });
    }
    else if (currentLocation.pathname === '/sign-up') {
      setButtonInfo({ path: 'sign-in', textOfButton: 'Войти' });
    }
  }, [currentLocation.pathname]);

  return (
    <header className="header">

      <nav className={`header__nav_type_mobile ${isBurgerClicked ? 'active' : ''}`}>
        <ul className='header__list_type_mobile'>
          <li className='header__user_type_mobile'>{isLoggedIn ? email : ''}</li>

          <li>
            <Link
              to='/'
              onClick={handleSignOut}
              className='header__button_type_mobile'
            >
              {isLoggedIn ? 'Выйти' : ''}
            </Link>
          </li>
        </ul>
      </nav>

      <div className='header__bar'>
        <img className="header__logo" src={logo} alt="Логотип Местро" />

        <div className={`${isLoggedIn ? 'header__burger' : ''} ${isBurgerClicked ? 'active' : ''}`} onClick={handleBurgerClick}>
          <span></span>
        </div>

        <nav className='header__nav'>
          <ul className='header__list'>
            <li className='header__user'>{isLoggedIn ? email : ''}</li>
            
            <li>
              <Link
                to={isLoggedIn === false ? buttonInfo.path : '/'}
                className='header__button'
                style={isLoggedIn ? {} : { display: 'block' }}
                onClick={onSignOut}
              >
                {isLoggedIn === false ? buttonInfo.textOfButton : 'Выйти'}
              </Link>
            </li>
          </ul>
        </nav>

      </div>

    </header>
  );
}

export default Header; 