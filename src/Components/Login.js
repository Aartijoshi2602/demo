import React from 'react';
import '../App.css';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


export const Login = () => {
  const history = useHistory()
  return (
    <div className='box'>
      <h1>Login form</h1>
      <Formik
        initialValues={{
          uname: '',
          password: '',
        }}
        onSubmit={async (values) => {
          axios.post('http://13.51.56.32:3001/user/login', values)
            .then((res) => {
              console.log(res.data.token);
              localStorage.setItem('token', res.data.token)
              history.push('/contact')
            })
            .catch((error) => {
              console.log(error);
            })
        }}
      >
        <Form>
          <div className='label'>
            <label htmlFor="Username">Username</label>
            <Field id="username" name="uname" placeholder="Username" required />
          </div>
          <div className='label'>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="password" type="password" required />
          </div>
          <div className='button'>
            <button type="submit">Submit</button>
            <Link to="/signup">Signup</Link>
          </div>
        </Form>
      </Formik>
    </div>

  )
}

export default Login;
