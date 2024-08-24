import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,FormFeedback 
} from "reactstrap";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; //
const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Step 2: Handle input changes
  const handleChange = (event) => {
       const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
 

  };


  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(username==='Admin' && password=='Admin')
      {
        navigate('/employee/table');
        localStorage.setItem('user', null);
        localStorage.clear();
      }else{
        
      const request={
        
          username:username,
          password: password
        }
      
      const response = await axios.post('http://localhost:3500/api/employee/login', request);

      localStorage.setItem('user', JSON.stringify(response.data.data));
      navigate('/employee/EditProfile');
      }
    } catch (error) {
      alert('Login Failed');
    
      console.error('API error:', error);
    }
   
    if (!validate()) {
      return;
    }

   
  
  };

  return (
    <Row>
    <Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Login 
        </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">User Name</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
                invalid={!!errors.username} // Set invalid prop if there's an error
              />
              {errors.username && <FormFeedback>{errors.username}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                invalid={!!errors.password} // Set invalid prop if there's an error
              />
              {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>
  );
};

export default Login;
