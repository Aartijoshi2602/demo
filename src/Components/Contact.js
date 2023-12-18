import { useEffect, useState } from 'react';
import '../App.css';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

export const Contact = () => {
  const [data, setData] = useState([])

  const getAllRecords = () => {
    const token = localStorage.getItem('token')
    axios.get("http://13.51.56.32:3001/phonebook/findbyuser",
      {
        headers: { usertoken: token }
      })
      .then((res) => {
        setData(res.data.data) 
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getAllRecords()
  }, [])

  const deleteHandler = (id) => {
    const token = localStorage.getItem('token')
    axios.delete('http://13.51.56.32:3001/phonebook/delete?id=' + id, {
      headers: { usertoken: token }
    })
      .then((res) => {
        console.log(res)
        getAllRecords()
      })
  }

  const [initialValues, setInitialValues] = useState({
    fname: " ",
    lname: " ",
    contact: " ",
    city: " ",
    country: " ",
  })

  const [editIndex, setIndexValue] = useState("")

  const editHandler = (index) => {
    let copyArray = [...data]
    setInitialValues(copyArray[index])
    setIndexValue(copyArray[index]._id)
  }

  return (
    <div className='form'>
      <h1>Contact Form</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize

        onSubmit={async (values, Action) => {
          // let copyArray = [...data]
          // if => splice to push 
          if (editIndex) {
            const token = localStorage.getItem('token')

            axios.patch('http://13.51.56.32:3001/phonebook/update?id=' + editIndex, values, {
              headers: { usertoken: token }
            })
              .then((res) => {
                console.log(res)
                getAllRecords()
                Action.resetForm()
                setInitialValues({
                  fname: " ",
                  lname: " ",
                  contact: " ",
                  city: " ",
                  country: " ",
                })
              })

          }
          else {
            const token = localStorage.getItem('token')
            axios.post('http://13.51.56.32:3001/phonebook/create', values,
              {
                headers: { usertoken: token }
              })
              .then((res) => {
                console.log(res)

              })
              .catch((error) => {
                console.log(error);
              })
            Action.resetForm()
            setInitialValues({
              fname: " ",
              lname: " ",
              contact: " ",
              city: " ",
              country: " ",
            })

          }
        }}
      >
      <Form>
          <div className='label1'>
            <label htmlFor="fname">First Name</label>
            <Field id="fname" name="fname" placeholder="firstName" required />
          </div>
          <div className='label1'>
            <label htmlFor="lname">Last Name</label>
            <Field id="lname" name="lname" placeholder="lastname" required />
          </div>
          <div className='label1'>
            <label htmlFor="contact">Contact</label>
            <Field id="contact" name="contact" placeholder="contact" required />
          </div>
          <div className='label1'>
            <label htmlFor="city">City</label>
            <Field id="city" name="city" placeholder="city" required />
          </div>
          <div className='label1'>
            <label htmlFor="country">Country</label>
            <Field id="country" name="country" placeholder="country" required />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <div className="ot">
        <table cellPadding={5} border={1} align='center'>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th>City</th>
            <th>Country</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
          {
            data.map((el, index) => (
              <tr key={index}> {/* Added the key prop with a unique value */}
                <td>{el.fname}</td>
                <td>{el.lname}</td>
                <td>{el.contact}</td>
                <td>{el.city}</td>
                <td>{el.country}</td>
                <td>
                  <button onClick={() => deleteHandler(el._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => editHandler(index)}>Edit</button> {/* Changed "edit" to "Edit" for consistency */}
                </td>
              </tr>
            ))

          }

        </table>
      </div>
    </div>
  )
}

export default Contact;