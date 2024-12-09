import React from 'react'
import './Form.css'
function Login() {
  return (
    <div class="container">
    <h2>Login</h2>
    <form action="/login" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required></input>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required></input>

      <button type="submit">Login</button>
      <div class="link">
        <a href="#">Don't have an account? Sign up</a>
      </div>
    </form>
  </div>
  )
}

export default Login