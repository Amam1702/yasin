import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  useEffect(() => {
      if(isLoggedIn){
        navigate("/");
      }
  }, [isLoggedIn]);
 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const errors = {};
   
    if (username.trim() === '') {
      errors.client_name = 'This fields is required';
    }
    if (password.trim() === '') {
      errors.address = 'This fields is required';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
        const headers = {
          'Content-Type': 'application/json',
        };
        setLoading(true);
        axios
        .post('https://seashell-app-cthwc.ondigitalocean.app/api-token-auth/', formData, { headers })
        .then((response) => {
          let res = response.data;
          setLoading(false);
          if(res.token !== undefined){
            toast.success("Login successfully");
            localStorage.setItem("token",res.token);
            navigate("/");
          }else{
            toast.success("Invalid credentials, try again");
          }
        })
        .catch((error) => {
          setLoading(false);
          if( error.response ){
              let res = error.response.data;
              console.log("error response: ",res); // => the response payload 
              const errors = {};
              if(res.non_field_errors !== undefined){
                errors.password = res.non_field_errors[0];
                setFormErrors(errors);
              }
          }
        });
    }
  };
  return (
    <div className="hold-transition login-page">
     <div className="login-box">
        <div className="login-logo">
            <div><img src={Logo} width="50" alt="Logo" /><b>Conex</b><span className='text-danger'>Login</span></div>
        </div>
        <div className="card">
            <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit} method="post">
              <div className='form-group'>
                <label>Username</label>
                <div className="input-group mb-3">
                  <input
                    className='form-control'
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Enter Username'
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                      <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                      </div>
                  </div>
                </div>
                {formErrors.username && <span className="text-danger error">{formErrors.username}</span>}
              </div>
              <div className='form-group'>
                <label>Password</label>
                <div className="input-group mb-3">
                  <input
                    className='form-control'
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                      <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                      </div>
                  </div>
                </div>
                {formErrors.password && <span className="text-danger error">{formErrors.password}</span>}
              </div>
                
                <div className="row">
                <div className="col-12 text-center">
                    <button disabled={loading} className="btn btn-primary btn-block" type="submit"> {loading ? 'Processing...' : 'Sign In'}</button>
                </div>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;