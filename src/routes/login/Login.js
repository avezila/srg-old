/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {  Component, PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoginForm from '../../components/Form/Login'
import {Panel} from 'muicss/react'
import s from './Login.sass';


const title = 'Login';

@withStyles(s)
class Login extends Component  {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };
  static propTypes = {};

  render () {
    this.context.setTitle(title);
    return (
      <LoginForm />
    );
  }
}


export default Login;

