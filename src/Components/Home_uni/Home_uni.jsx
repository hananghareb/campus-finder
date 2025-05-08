import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home_uni.css'

export default function Home_uni() {
  function getalluni() {
    return axios.get('https://campus-finder.runasp.net/api/University/HomePage')
  }

  const { isError, isFetching, isLoading, data } = useQuery("alluni", getalluni)
  const universities = data?.data?.$values || [];
  const displayedUnis = universities.slice(0, 3);
console.log(data);

  return (
    <>
      <div className="container uni-api">
        <div className="row justify-content-center">
          {displayedUnis.map((uni, idx) => (
            <div key={idx} className="col-md-4 mb-4 d-flex justify-content-center">
                       <Link to={`/DetailsUni/${uni.universityId}`}>

          <div className="unicard">
                <img className='uni-img' src={uni.pictureURL} alt="university" />
                <div className="uni-info">
                  <h4 className="uni-name text-center mb-3">{uni.name}</h4>
                  <p className="uni-location ">
                    <i className="fas fa-map-marker-alt m-0"></i> {uni.location}
                  </p>
                </div>
              </div>
          
          </Link>
            </div>
          ))}
        </div>

        {universities.length > 3 && (
          <div className="text-center mt-4">
            <Link to="/universities">
              <button className="btn-view">View All</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
