import React from 'react'

const test = () => {
  return (
    <div>
<div className="login-container">
  <h1>Login</h1>
  <form id="loginForm">
    <div className="input-group">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" required />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
</div>

    </div>
  )
}

export default test
