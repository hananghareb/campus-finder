import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Top10.css';
import { Link } from 'react-router-dom';

const TopUniversities = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios.get('https://campus-finder.runasp.net/api/University/top10')
      .then((res) => {
        if (res.data?.$values) {
          setUniversities(res.data.$values);
        }
      })
      .catch((err) => {
        console.error('Error fetching top 10 universities:', err);
      });
  }, []);

  return (
    <div className="top-uni-container">
      <h2 className="title mt-1">🏆 Top 10 Universities</h2>
      <div className="top-uni-list">
        {universities.map((uni) => (
          <Link
            to={`/DetailsUni/${uni.universityId}`}
            key={uni.universityId}
            className="uni-card"
          >
            <img src={uni.pictureURL?.trim()} alt={uni.name?.trim()} className="uni-img" />
            <div className="uni-info">
              <h3 className="uni-name">{uni.name?.trim()}</h3>
              <p className="uni-location">{uni.location?.trim()}</p>
              <span className="uni-rank">Rank #{uni.rank?.trim()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopUniversities;
