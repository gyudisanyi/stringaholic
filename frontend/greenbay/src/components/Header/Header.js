import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login'
import './Header.css'

export default function Header () {
  return(
    <>
      <Link to='/' ><h1>`'"Stringaholic"'`</h1></Link>
      <Login />
    </>
  )
}
