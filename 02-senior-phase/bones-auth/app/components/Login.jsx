import React from 'react'

export const Login = ({ login }) => (
  // rendering a form, with an onsubmit event
  <form onSubmit={evt => {
    // prevent reloading of page
    evt.preventDefault()
    // runs 'login'
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
    <a href="/api/auth/login/google">Login with google</a>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

// connect function: mapStateToProps, mapDispatchToProps
export default connect(
  state => ({}),
  {login},
)(Login)
