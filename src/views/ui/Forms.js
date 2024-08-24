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
  FormText
} from "reactstrap";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Forms = () => {
  const location = useLocation();
  const employee = location.state?.employee;

  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    employee_code: '',
    first_name: '',
    lastname: '',
    departmentId: '',
    email: '',
    mobile: '',
    userName: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch department data
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/employee/department_list/1', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setDepartmentData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch departments.');
        setLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_code: employee.employeecode || '',
        first_name: employee.firstname || '',
        lastname: employee.lastname || '',
        departmentId: employee.departmentId || '',
        email: employee.email || '',
        mobile: employee.mobile || '',
        userName: employee.username || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employee_code) newErrors.employee_code = 'Employee code is required';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.lastname) newErrors.lastname = 'Last name is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.userName) newErrors.userName = 'User name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3500/api/employee/new_employee', formData);
        setSuccess(true);
        toast.success('Employee added successfully!');
        console.log('API response:', response.data);
      } catch (error) {
        toast.error('Failed to add employee. Please try again.');
        console.error('API error:', error);
      }
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            {employee ? 'Edit Employee Details' : 'Add Employee'}
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="employee_code">Employee Code</Label>
                <Input
                  id="employee_code"
                  name="employee_code"
                  type="text"
                  value={formData.employee_code}
                  onChange={handleChange}
                  invalid={!!errors.employee_code}
                />
                {errors.employee_code && <FormText color="danger">{errors.employee_code}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  invalid={!!errors.first_name}
                />
                {errors.first_name && <FormText color="danger">{errors.first_name}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  invalid={!!errors.lastname}
                />
                {errors.lastname && <FormText color="danger">{errors.lastname}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="departmentId">Department</Label>
                <Input
                  id="departmentId"
                  name="departmentId"
                  type="select"
                  value={formData.departmentId}
                  onChange={handleChange}
                  invalid={!!errors.departmentId}
                >
                  <option value="">None</option>
                  {departmentData.map((tdata) => (
                    <option key={tdata.departmentId} value={tdata.departmentId}>{tdata.departmentname}</option>
                  ))}
                </Input>
                {errors.departmentId && <FormText color="danger">{errors.departmentId}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  invalid={!!errors.email}
                />
                {errors.email && <FormText color="danger">{errors.email}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleChange}
                  invalid={!!errors.mobile}
                />
                {errors.mobile && <FormText color="danger">{errors.mobile}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="userName">User Name</Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={handleChange}
                  invalid={!!errors.userName}
                />
                {errors.userName && <FormText color="danger">{errors.userName}</FormText>}
              </FormGroup>
              {isSuccess && <p>Successfully Saved.</p>}
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
