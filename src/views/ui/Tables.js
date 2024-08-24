import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardTitle, CardBody } from "reactstrap";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; //
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // Initial filter state
  const [departmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the API


    fetchEmployees();
  }, [selectedFilter]);
  const fetchEmployees = async () => {
    try {
      const request = {
        "department_id": selectedFilter,
        "searchTerm": null,
        "sortColumn": "firstname",
        "sortOrder": "asc",
        "pageNumber": 1,
        "pageSize": 10
      };
      const response = await axios.post('http://localhost:3500/api/employee/fetch_employee', request, {
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
      });
      console.log('Response data:', response.data.data);
      setTableData(response.data.data);
      setLoading(false);
    } catch (err) {
      // setError(err);
      setLoading(false);
    }
  };
  const handleEdit = (data) => {
    navigate('/Employee/forms', { state: { employee: data } });
  };

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

  const handleDelete = async (data) => {
    try {

      const response = await axios.get('http://localhost:3500/api/employee/delete_employee/' + data.employeeId, {
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
      });
      fetchEmployees();
    } catch (e) {

    }
  };

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    toggleDropdown();
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}

      <Col lg="12" className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee Table</h2>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            Filter: {selectedFilter}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleFilterChange(null)}>All</DropdownItem>
            {departmentData.map((tdata) => (
               <DropdownItem onClick={() => handleFilterChange(tdata.departmentId)}>{tdata.departmentname}</DropdownItem>
                    
                  ))}
           
            {/* Add more filter options here */}
          </DropdownMenu>
        </Dropdown>
      </Col>

      <Col lg="12">
        <ProjectTables tableData={tableData} onEdit={handleEdit} onDelete={handleDelete} />
      </Col>

    </Row>
  );
};

export default Tables;
