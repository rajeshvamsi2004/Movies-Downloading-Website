import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cinema.css';

const Lang = () => {
  const [first, setFirst] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    setFirst(e.target.value);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== 'Language') {
      navigate(`/${selectedValue}`); // Navigate to the route corresponding to the selected language
    }
  };

  return (
    <div value={first} onChange={handle} className='butt1'>
      <Form.Select onChange={handleChange} className='box2' aria-label="Language">
        <option value="Language">Language</option>
        <option value="Telugu">Telugu</option>
        <option value="English">English</option>
        <option value="Tamil">Tamil</option>
        <option value="Malayalam">Malayalam</option>
        <option value="Hindi">Hindi</option>
      </Form.Select>
    </div>
  );
};

export default Lang;
