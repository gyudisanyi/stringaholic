import React, { useState } from 'react';
import generalFetch from '../../utilities/generalFetch'
import Button from '../Button/Button';
import './Login.css';

function Login() {

  const [loginData, setLogin] = useState({
    email: '',
    password: ''
  }
  )

  async function loginClick() {
    if (localStorage.getItem('username')) {
      localStorage.clear()
    }
    const body = {
      email: loginData.email,
      password: loginData.password,
    };
    
    try {
      const data = await generalFetch('auth/login', 'POST', body);
      if (data.access_token && data.username && data.balance) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('balance', data.balance);
      }
      const users = await generalFetch('users', 'GET');
      localStorage.setItem('users', JSON.stringify(users))
      if (data.message) {
        throw new Error(data.message);
      };
    } catch (err) {
      console.log(err)
      return null;
    }
    setLogin({
      email: '',
      password: ''
    }
    )
  };

  const mailChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    setLogin({
      ...loginData,
      email: value,
    });
  };

  const passwordChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    setLogin({
      ...loginData,
      password: value,
    });

  };

  function hitEnter(event) {
    if (event.key === 'Enter') {
      loginClick();
    }
  }

  return (
    <div id="login">
      {!localStorage.getItem('username') ?
        (
          <form id="loginform">
            <label htmlFor="email">
              <input
                type="text"
                name="email"
                placeholder="e-mail"
                onChange={mailChange}
                onKeyPress={hitEnter}
                />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={passwordChange}
                onKeyPress={hitEnter}
                />
            </label>
            <Button buttonClass="loginButton" buttonText="login" handleClick={loginClick} onKeyPress={hitEnter} />
          </form>
        ) : (
          <div id="user">
            <div id="hello" ><strong>{`Hello ${localStorage.getItem('username')}!`}</strong> You have</div>
            <div id="balance"><span>{`${localStorage.getItem('balance')}$`}</span></div>
            <Button buttonClass="emptyButton" buttonText="logout" handleClick={loginClick} onKeyPress={hitEnter} />
          </div>
        )}
    </div>
  );
}

export default (Login);
