import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import './Colleges.css';
import {
  FaMoneyBillWave,
  FaClock,
  FaBookOpen,
  FaSchool
} from 'react-icons/fa';

export default function CollegeDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(['collegeDetails', id], () =>
    axios.get(`https://campus-finder.runasp.net/api/University/college/${id}`)
  );

  if (isLoading) return <div className="text-center mt-5">Loading college details...</div>;
  if (error) return <p className="text-danger text-center">Error loading college details.</p>;

  const college = data?.data;

  return (
    <div className="container py-5">
      <div className="card shadow p-4 rounded-4 glass-card">
        <h2 className="text-center fw-bold text-maincolor mb-3">{college.name}</h2>
        <p className="text-muted text-center">{college.description}</p>

        <div className="row mt-4">
          <DetailItem icon={<FaMoneyBillWave />} title="Standard Fees" value={`${college.standardFees} EGP`} />
          <DetailItem icon={<FaClock />} title="Years of Duration" value={college.yearsOfDration} />
        </div>

        <hr />

        <h5 className="fw-bold mt-4">Diplomas</h5>
        <div className="row">
          {college.diplomas.$values.map((diploma, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <div className="p-3 border rounded-3 shadow-sm">
                <FaSchool className="me-2 text-maincolor" />
                <strong>{diploma.diplomaName}</strong><br />
                <small>Min Grade: {diploma.minGrade}</small><br />
                <small>Requirements: {diploma.requirements}</small>
              </div>
            </div>
          ))}
        </div>

        <h5 className="fw-bold mt-4">English Tests</h5>
        <div className="row">
          {college.englishTests.$values.map((test, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <div className="p-3 border rounded-3 shadow-sm">
                <FaBookOpen className="me-2 text-maincolor" />
                <strong>{test.testName}</strong><br />
                <small>Min Score: {test.minScore}</small>
              </div>
            </div>
          ))}
        </div>

        <h5 className="fw-bold mt-4">Majors</h5>
<div className="row">
  {college.majors?.$values?.length > 0 ? (
    college.majors.$values.map((major, idx) => (
      <div className="col-md-6 mb-3" key={idx}>
        <div className="p-3 border rounded-3 shadow-sm">
          <h6 className="fw-bold text-maincolor">{major.name}</h6>
          <p className="text-muted mb-0">{major.description}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12 text-center">
      <div className="alert alert-dark w-25 mx-auto mt-2 fst-italic">
        "This college does not have any associated majors."

      </div>
    </div>
  )}
</div>


      </div>
    </div>
  );
}

function DetailItem({ icon, title, value }) {
  return (
    <div className="col-md-6 mb-3 d-flex align-items-start">
      <div className="me-3 fs-4 text-maincolor">{icon}</div>
      <div>
        <div className="fw-bold">{title}</div>
        <div className="text-muted">{value}</div>
      </div>
    </div>
  );
}
