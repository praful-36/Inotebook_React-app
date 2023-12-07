import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    console.log(json)

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('Auth_Token', json.Auth_Token);
      props.showAlert("successfully Login ", "success")
      navigate("/");
    }
    else {
      props.showAlert("invalid Details ", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className='M-s1'>
        <h2>Login :-</h2>

        <div className="mb-3">

          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" name='email' />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password </label>
          <div className="password-input-container">

            <input type={showPassword ? 'text' : 'password'} className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
            {credentials.Confirm_password && (
            <button type="button" onClick={handleTogglePassword} className="toggle-password-button" >  {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )} </button>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-light">Submit</button>
      </form>
    </div>
  )
}

export default Login