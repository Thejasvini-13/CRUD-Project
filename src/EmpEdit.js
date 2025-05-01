import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [empData, setEmpData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        active: true,
    });

    const [loading, setLoading] = useState(true); 
    const [validationError, setValidationError] = useState(false); 
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/employee/${empid}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Employee not found or server error');
                }
                return res.json();
            })
            .then((data) => {
                setEmpData({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    active: data.active,
                });
                setLoading(false);
            })
            .catch((err) => {
                setServerError(err.message);
                setLoading(false);
            });
    }, [empid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!empData.name || !empData.email || !empData.phone) {
            setValidationError(true);
            return;
        }

        fetch(`http://localhost:5001/employee/${empid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(empData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update employee.");
                }
                return response.json();
            })
            .then(() => {
                alert("Employee updated successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error("Error while updating employee:", err.message);
                alert("Error occurred while updating employee.");
                setServerError(err.message);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ width: "100%", maxWidth: "600px" }}>
                <div className="text-center mb-4">
                    <h2 className="mb-1">Edit Employee</h2>
                    <span className="badge bg-secondary" style={{ fontSize: "1rem" }}>{empData.id}</span>
                </div>

                {serverError && (
                    <div className="alert alert-danger text-center">{serverError}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3 text-start">
                        <label><strong>Name</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={empData.name}
                            onChange={(e) => setEmpData({ ...empData, name: e.target.value })}
                        />
                        {validationError && !empData.name && <span className="text-danger">Name is required</span>}
                    </div>

                    <div className="form-group mb-3 text-start">
                        <label><strong>Email</strong></label>
                        <input
                            type="email"
                            className="form-control"
                            value={empData.email}
                            onChange={(e) => setEmpData({ ...empData, email: e.target.value })}
                        />
                        {validationError && !empData.email && <span className="text-danger">Email is required</span>}
                    </div>

                    <div className="form-group mb-3 text-start">
                        <label><strong>Phone</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={empData.phone}
                            onChange={(e) => setEmpData({ ...empData, phone: e.target.value })}
                        />
                        {validationError && !empData.phone && <span className="text-danger">Phone is required</span>}
                    </div>

                    <div className="form-check mb-3 text-start">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={empData.active}
                            onChange={(e) => setEmpData({ ...empData, active: e.target.checked })}
                            id="activeCheck"
                        />
                        <label className="form-check-label" htmlFor="activeCheck">Is Active</label>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Save</button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmpEdit;
