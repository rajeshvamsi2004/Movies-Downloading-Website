import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cinema.css'
import { useNavigate } from 'react-router-dom';
const Drop = () => {
  const[first,setFirst]=useState("")
  const handle =(e)=>{
      setFirst(e.target.value)
  }
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== "Year" || selectedValue=== "Year") {
      navigate(`/${selectedValue}`); 
    }
  }
  return (
    <div value={first} onChange={handle} className='butt' >
     <Form.Select onChange={handleChange} className='box' aria-label="2004">
      <option value="Year" >Year</option>
      <option  value="2015">2015</option>
      <option value="2016">2016</option>
      <option value="2017">2017</option>
      <option value="2018">2018</option>
    </Form.Select>
    </div>
  )
}

export default Drop
