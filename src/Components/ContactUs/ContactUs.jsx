import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';

function ContactForm() {
  return (
    <div className="contact-container py-5 ">
      <h2 className="text-center title">We’re here to</h2>
      <h1 className="text-center subtitle with-line">help you solve your problem</h1>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center align-items-stretch">
          <div className="col-md-4 d-flex">
            <div className="info-card p-4 shadow rounded w-100 h-100">
              <div className="mb-4">
                <i className="fa-solid fa-phone fa-lg me-2"></i>
                <strong>Call To Us</strong>
                <div className="contact-call">
                  <p className="available">We are available 24/7, 7 days a week.</p>
                  <p className="mb-0 phone">Phone: +88011112222</p>
                </div>
              </div>

              <div>
                <i className="fa-solid fa-envelope fa-lg me-2"></i>
                <strong className='mb-5'>Write To Us</strong>
                <div className="support">
                  <p className="mt-2">Fill out our form and we will contact <br /> you within 24 hours.</p>
                  <p className="mb-0 mt-2">Emails: customer@part.com</p>
                  <p className="mb-0 mt-2">Emails: support@part.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7 d-flex">
            <div className="form-card p-4 shadow rounded w-100 h-100">
              <div className="row g-3">
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Your Name *" />
                </div>
                <div className="col-md-4">
                  <input type="email" className="form-control" placeholder="Your Email *" />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Your Phone *" />
                </div>
                <div className="col-12">
                  <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
                </div>
                <div className="col-12 text-end">
                  <button className="btn send-btn">Send Message</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactForm;
