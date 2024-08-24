import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import PropTypes from 'prop-types';
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";



const ProjectTables = ({tableData, onEdit, onDelete}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5"><center>Employee List</center></CardTitle>
           <CardSubtitle className="mb-2 text-muted" tag="h6">
           
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Employee Code</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>{tdata.employeecode || 'N/A'}</td>
                  <td>{tdata.firstname || 'N/A'}</td>
                  <td>{tdata.lastname || 'N/A'}</td>
                  <td>{tdata.departmentname || 'N/A'}</td>
                  <td>{tdata.email || 'N/A'}</td>
                  <td>{tdata.mobile || 'N/A'}</td>
                  <td>
                    {/* Action buttons */}
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => onEdit(tdata)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(tdata)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

ProjectTables.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      employeecode: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      departmentname: PropTypes.string,
      email: PropTypes.string,
      mobile: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectTables;
