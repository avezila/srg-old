
import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.sass'


@withStyles(s)
class Login extends Component {
  render () {
    return (
      <div className={s.root}>
        Login
      </div>
    )
  }
}


export default Login;