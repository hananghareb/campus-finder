import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './Alluni.css';
import { Link } from 'react-router-dom';

export default function AllUniversities() {
  const [filters, setFilters] = useState({
    Search: '',
    Sort: '',
    Location: '',
    UniversityType: '',
    CollegeName: '',
    MinFees: '',
    MaxFees: ''
  });

  function getalluni() {
    return axios.get('https://campus-finder.runasp.net/api/University', {
      params: {
        ...filters
      }
    });
  }

  const { isError, isFetching, isLoading, data } = useQuery(["alluni", filters], getalluni);
  const universities = data?.data?.$values || [];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <div className="section2 text-center mt-5">
        <h3 className='maincolor'>Recommended University</h3>
        <p className='maincolor'>Most searched university in the website</p>
      </div>

      {/* 🔍 Filters */}
      <div className="container mb-4">
        <div className="row g-3 justify-content-center">
          <div className="col-md-3">
            <input type="text" name="Search" value={filters.Search} onChange={handleInputChange}
              placeholder="Search" className="form-control shadow-sm" />
          </div>

          <div className="col-md-2">
            <input type="text" name="Location" value={filters.Location} onChange={handleInputChange}
              placeholder="Location" className="form-control shadow-sm" />
          </div>
          <div className="col-md-2">
            <input type="text" name="UniversityType" value={filters.UniversityType} onChange={handleInputChange}
              placeholder="University Type" className="form-control shadow-sm" />
          </div>
          <div className="col-md-3">
            <input type="text" name="CollegeName" value={filters.CollegeName} onChange={handleInputChange}
              placeholder="College Name" className="form-control shadow-sm" />
          </div>
          <div className="col-md-2">
            <input type="number" name="MinFees" value={filters.MinFees} onChange={handleInputChange}
              placeholder="Min Fees" className="form-control shadow-sm" />
          </div>
          <div className="col-md-2">
            <input type="number" name="MaxFees" value={filters.MaxFees} onChange={handleInputChange}
              placeholder="Max Fees" className="form-control shadow-sm" />
          </div>
        </div>
      </div>

      {/* 🏫 University List */}
      <div className="container uni-api">
        <div className="row justify-content-center">
          {universities.map((uni, idx) => (
            <div key={idx} className="col-md-4 mb-4 d-flex justify-content-center">
              <Link to={`/DetailsUni/${uni.universityID}`}>
                <div className="unicard">
                  <img className='uni-img' src={uni.pictureURL} alt="university" />
                  <div className="uni-info">
                    <h4 className="uni-name text-center">{uni.name}</h4>
                    <p className="uni-location mt-1">
                      <i className="fas fa-map-marker-alt m-0 "></i> {uni.location}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
