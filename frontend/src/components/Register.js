import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
      .then(() => {
        setEmail('');
        setPassword('');
      });
  }

  return (
    <div className="auth">
      <AuthForm
        name={"registration"}
        title={"Регистрация"}
        btnTitle={"Зарегистрироваться"}
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Link className="auth__signin" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </div>
  )
}


export default Register
