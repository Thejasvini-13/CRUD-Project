import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5001/employee") // Corrected port
            .then((res) => res.json())
            .then((data) => {
                empdatachange(data); // Update the state with the fetched data
            })
            .catch((err) => {
                console.log("Error fetching employee data:", err.message);
            });
    }, []); // The empty array ensures this is only run on component mount

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    };

    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    };

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:5001/employee/" + id, {
                method: "DELETE",
            })
                .then((res) => {
                    alert('Removed successfully.');
                    window.location.reload(); // Refresh the page after removing
                })
                .catch((err) => {
                    console.log("Error deleting employee:", err.message);
                });
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="sub-heading">Employee Dashboard</h2>
                </div>
                <div className="card-body">
                <div className="divbtn" style={{ marginBottom: "20px" }}>
    <Link 
        to="employee/create" 
        className="btn"
        style={{ backgroundColor:"cadetblue" ,color:"white"}}
    >
        Add New (+)
    </Link>
</div>

                    <table className="table table-bordered">
                    <thead className="bg-dark text-white">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
    </tr>
</thead>

                        <tbody>
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</a>
                                            <a onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</a>
                                            <a onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;
