import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);
    const [newId, setNewId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5001/employee")
            .then((res) => res.json())
            .then((data) => {
                const ids = data
                    .map(emp => emp.id)
                    .filter(id => id.startsWith("EMP"))
                    .map(id => parseInt(id.replace("EMP", ""), 10));
                const maxId = Math.max(0, ...ids);
                const nextId = `EMP${String(maxId + 1).padStart(3, '0')}`;
                setNewId(nextId);
            })
            .catch((err) => console.log("Error generating ID:", err.message));
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();

        const empdata = { id: newId, name, email, phone, active };

        fetch("http://localhost:5001/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empdata),
        })
            .then((res) => res.json())
            .then(() => {
                alert('Employee saved successfully!');
                navigate('/');
            })
            .catch((err) => {
                console.log("Error while saving data:", err.message);
            });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ width: "100%", maxWidth: "600px" }}>
                <div className="text-center mb-4">
                    <h2 className="mb-1">Employee Create</h2>
                    <span className="badge bg-secondary" style={{ fontSize: "1rem" }}>{newId}</span>
                </div>

                <form onSubmit={handlesubmit}>
                    <div className="form-group mb-3 text-start">
                        <label><strong>Name</strong></label>
                        <input
                            required
                            value={name}
                            onMouseDown={() => valchange(true)}
                            onChange={(e) => namechange(e.target.value)}
                            className="form-control"
                        />
                        {name.length === 0 && validation && (
                            <span className="text-danger">Enter the name</span>
                        )}
                    </div>

                    <div className="form-group mb-3 text-start">
                        <label><strong>Email</strong></label>
                        <input
                            value={email}
                            onChange={(e) => emailchange(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3 text-start">
                        <label><strong>Phone</strong></label>
                        <input
                            value={phone}
                            onChange={(e) => phonechange(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-check mb-3 text-start">
                        <input
                            checked={active}
                            onChange={(e) => activechange(e.target.checked)}
                            type="checkbox"
                            className="form-check-input"
                            id="activeCheck"
                        />
                        <label className="form-check-label" htmlFor="activeCheck">Is Active</label>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" type="submit">Save</button>
                        <Link to="/" className="btn btn-danger">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmpCreate;
