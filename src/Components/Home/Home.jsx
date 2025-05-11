import React from 'react'
import Slider from 'react-slick'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'
import Home_uni from '../Home_uni/Home_uni'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Events from '../Events/Events'

export default function Home() {

  function getalluni() {
    return axios.get('https://campus-finder.runasp.net/api/University/HomePage')
  }

  const { data } = useQuery("alluni", getalluni)
  const universities = data?.data?.$values?.slice(9, 15) || []

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  }
  return (
    <>
      <div className="slider-wrapper mb-5">
        <Slider {...settings}>
          {universities.map((uni, idx) => (
            <div key={idx} className="slider-item">
              <div className="slider-content d-flex align-items-center justify-content-center flex-column text-center">
                <img className="slider-img mb-3" src={uni.pictureURL} alt={uni.name} />
                <h3 className="slider-title">{uni.name}</h3>
                <p className="slider-desc">{uni.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Section 2 */}
      <div className="section2 text-center mt-5">
        <h3 className='maincolor'>Recommended University</h3>
        <p className='maincolor'>Most searched university in the website</p>
      </div>
      <Home_uni />
      <Events/>
      {/* Contact Section */}
      <div className="contact-help d-flex m-5 ">
        <div className="img w-50 ">
          <img src={require('../../Images/contact1.png')} alt="contact" />
        </div>
        <div className="contact-text">
          <h3>We're here to help</h3>
          <p>Read through our FAQs and, if you can't find what <br /> you're looking for, our experts will be happy to <br /> answer your questions.</p>
          <Link to='/contactus'>
            <button>Contact us</button>
          </Link>
        </div>
      </div>
    </>
  )
}
