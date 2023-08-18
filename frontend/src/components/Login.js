import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
      .then(resetForm)
      .then(() => history.push('/main'))
  }

  return(
    <div className="auth">
      <AuthForm
        name={"login"}
        title={"Вход"}
        btnTitle={"Войти"}
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login
