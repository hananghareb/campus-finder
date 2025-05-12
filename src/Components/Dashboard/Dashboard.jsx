import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('https://campus-finder.runasp.net/api/University')
      .then((res) => {
        setUniversities(res.data.$values || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this university?');
  if (!confirmDelete) return;

  const token = localStorage.getItem('tkn');

  try {
    await axios.delete(`https://campus-finder.runasp.net/api/University/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUniversities((prev) => prev.filter((uni) => uni.universityID !== id));
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete university.");
  }
};


  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">Error fetching data</div>;

  return (
    <div className="p-4 min-vh-100">
      <div className="container p-4 rounded shadow-sm">

        <Link to={'/create-uni'}>
          <div className="d-flex justify-content-center mb-4">
            <button className="btn btn-create">Create New University</button>
          </div>
        </Link>

        <div className="d-flex flex-column gap-3">
          {universities.map((university) => (
            
            <div key={university.universityID} className="d-flex align-items-center p-3 border rounded shadow-sm">
              <img
                src={university.pictureURL}
                alt="University"
                className="me-3 rounded img-dash"
              />

              <div className="flex-grow-1">
                <h5 className="mb-2">{university.name}</h5>
                <p className="text-muted mb-2" style={{
                  maxHeight: "4.8em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical"
                }}>
                  {university.description}
                </p>
                <p className="text-secondary small mb-0">{university.location}</p>
              </div>

              <div className="d-flex justify-content-end pe-3 ms-5">
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => handleDelete(university.universityID)}
                >
                  Delete
                </button>
                <Link to={`/update-uni/${university.universityID}`}>
                <button className="btn btn-outline-primary">Update</button>
                
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
