import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import './DetailsUni.css';
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaUniversity,
  FaLanguage,
  FaFileAlt,
  FaGraduationCap,
  FaEnvelope
} from 'react-icons/fa';

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { data, isLoading, error } = useQuery(['universityDetails', id], () =>
    axios.get(`https://campus-finder.runasp.net/api/University/${id}`)
  );

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <p className="text-danger text-center">Error loading university details.</p>;

  const uni = data?.data;
  const description = uni?.description || "No description available.";
  const isLongDesc = description.length > 150;
  const displayedDesc = isLongDesc && !showFullDesc
    ? description.slice(0, 150) + "..."
    : description;

  const colleges = uni?.colleges?.$values || [];

  return (
    <div className="container py-5 UniDetails">
      <div className="text-center mb-4">
        <h2 className="maincolor fw-bold">{uni?.name}</h2>
        <p className="text-muted">{uni?.location}</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 rounded-4 glass-card">
            <img
              src={uni?.pictureURL}
              alt={uni?.name}
              className="img-fluid rounded-4 mb-4 university-img"
            />

            <div className="info-grid">
              <InfoItem icon={<FaUniversity />} title="University Type" value={uni?.universityType} />
              <InfoItem icon={<FaGraduationCap />} title="Degree Type" value={uni?.degreeType} />
              <InfoItem icon={<FaLanguage />} title="Language" value={uni?.primaryLanguage} />
              <InfoItem icon={<FaFileAlt />} title="Required Documents" value={uni?.requiredDocuments} truncate />
              <InfoItem icon={<FaEnvelope />} title="University Email" value={
                <a href={`mailto:${uni?.uniEmail}`} className="text-decoration-none text-primary">{uni?.uniEmail}</a>
              } />
              <InfoItem icon={<FaMapMarkerAlt />} title="Location" value={uni?.location} />
              <InfoItem icon={<FaGlobe />} title="Website" value={
                <a href={uni?.websiteURL} target="_blank" rel="noreferrer">{uni?.websiteURL}</a>
              } />
            </div>

            <div className="mt-4">
              <h5 className="fw-bold">Description</h5>
              <p>
                {displayedDesc}
                {isLongDesc && (
                  <span
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    style={{ color: '#00bfff', cursor: 'pointer', marginLeft: '8px', fontWeight: 'bold' }}
                  >
                    {showFullDesc ? 'View Less' : 'View More'}
                  </span>
                )}
              </p>
            </div>

            {colleges.length > 0 && (
              <div className="mt-5">
                <h5 className="fw-bold mb-3">Colleges</h5>
                <div className="row g-3">
                  {colleges.map((college, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div
                        className="card h-100 shadow-sm rounded-4 border-0 college-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/college/${college.collegeID}`)}
                      >
                        <div className="card-body d-flex align-items-center justify-content-center text-center">
                          <h6 className="fw-semibold text-maincolor">{college.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, title, value, truncate }) {
  const [showFull, setShowFull] = useState(false);
  const isLongText = typeof value === 'string' && value.length > 100;
  const shouldTruncate = truncate && isLongText;

  const displayedValue = shouldTruncate && !showFull
    ? value.slice(0, 100) + "..."
    : value;

  return (
    <div className="info-item d-flex mb-3">
      <div className="icon text-maincolor fs-5 me-3">{icon}</div>
      <div>
        <div className="fw-bold">{title}</div>
        <div className="text-muted">
          {displayedValue || 'N/A'}
          {shouldTruncate && (
            <span
              onClick={() => setShowFull(!showFull)}
              style={{ color: '#00bfff', cursor: 'pointer', marginLeft: '8px', fontWeight: 'bold' }}
            >
              {showFull ? 'View Less' : 'View More'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
