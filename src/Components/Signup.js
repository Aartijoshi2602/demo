import React from 'react';
import '../App.css';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import axios from 'axios';

export const Signup = () => {
  return (
    <div className='signbox'>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          fname: '',
          lname: '',
          uname: '',
          password: '',
          contact: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >

        <Form>
          <div className='label'>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="fname" placeholder="Jane" required />
          </div>
          <div className='label'>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lname" placeholder="Doe" required />
          </div>
          <div className='label'>
            <label htmlFor="Username">Username</label>
            <Field id="Username" name="uname" placeholder="Username" required />
          </div>
          <div className='label'>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="password" type="password" required />
          </div>
          <div className='label'>
            <label htmlFor="Contact">Contact</label>
            <Field id="Contact" name="contact" placeholder="Contact" type="number" required />
          </div>
          <div className='label'>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
              required
            />
          </div>
          <div className='button'>
            <Link to="/contact"><button type="submit">Submit</button></Link>
            <Link to="/contact">Contact</Link>
          </div>
        </Form>

      </Formik>
    </div>
  )
}
