import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './App.css'; // Import your global CSS here

const EmpDetail = () => {
    const { empid } = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:5001/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    return (
        <div className="detail-container">
            <div className="card detail-card">
                <div className="card-title">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    {empdata &&
                        <div className="detail-content">
                            <p><strong>Name:</strong> {empdata.name}</p>
                            <p><strong>ID:</strong> {empdata.id}</p>
                            <p><strong>Email:</strong> {empdata.email}</p>
                            <p><strong>Phone:</strong> {empdata.phone}</p>
                            <p><strong>Status:</strong> {empdata.active ? "Active" : "Inactive"}</p>
                            <Link className="btn btn-danger mt-3" to="/">BACK TO DASHBOARD</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EmpDetail;
