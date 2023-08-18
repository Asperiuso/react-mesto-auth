import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onRegister, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      noValidate
      name="register"
    >
      <h2 className="auth__title">Регистрация</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
        onChange={handleEmailChange}
        autoComplete="off"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="auth__input"
        onChange={handlePasswordChange}
        autoComplete="off"
      />
      <button type="submit" className="auth__btn">
        Зарегистрироваться
      </button>
      <div className="auth__signin">
        <div
          onClick={() => navigate('/sign-in')}
          className="auth__login-link"
        >
          Уже зарегистрированы? Войти
        </div>
      </div>
    </form>
  );
}

export default Register;
