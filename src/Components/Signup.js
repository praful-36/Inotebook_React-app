import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", Confirm_password: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, Confirm_password: credentials.Confirm_password  })

    });
    const json = await response.json();
    console.log(json)

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('Auth_Token', json.Auth_Token);
      props.showAlert("account created successfully", "success")
      navigate("/");

    }
    else {
      props.showAlert("invalid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleTogglePassword = (passwordField) => {
    if (passwordField === 'password') {
      setShowPassword(!showPassword);
    } else if (passwordField === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


  return (
    <form onSubmit={handleSubmit} className='M-s2'>
      <h2>Sign Up :-</h2>
      <div className="mb-3">
        <label htmlFor="Name" className="form-label">Name</label>
        <input type="text" className="form-control" id="Name" onChange={onChange} name='name' aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
            minLength={5}
            required
          />
          {credentials.password && (
            <button
              type="button"
              onClick={() => handleTogglePassword('password')}
              className="toggle-password-button"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="Confirm_password" className="form-label"> Confirm Password </label>

        <div className="password-input-container">
          <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" value={credentials.Confirm_password} onChange={onChange} id="Confirm_password" name="Confirm_password" minLength={5} required />

          {credentials.Confirm_password && (
            <button type="button" onClick={() => handleTogglePassword('confirmPassword')} className="toggle-password-button" >    {showConfirmPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>} </button>
          )}
        </div>

      </div>

      <button type="submit" className="btn btn-light">Submit</button>
    </form>
  )
}

export default Signup
