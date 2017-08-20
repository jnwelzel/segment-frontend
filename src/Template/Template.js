import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import logo from './logo.svg';
import './Template.css';

const Template = ({ children, match }) => (
  <div>
    <div className="Template-header">
      <img src={logo} className="Template-logo" alt="logo" />
      <h2>Segmentation App</h2>
    </div>
    
    <div className="Template-navs">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <NavLink className={cx('nav-link', { 'active': window.location.pathname === '/' })} to="/contacts" activeClassName="active">Contacts</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/segmentations" activeClassName="active">Segmentations</NavLink>
        </li>
      </ul>
    </div>
    
    <div className="container">
      <div className="Template-content">
        {children}
      </div>
    </div>
  </div>
)

export default Template
