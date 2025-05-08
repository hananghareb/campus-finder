import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import './Createuni.css'
export default function Dashboard() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    requiredDocuments: '',
    universityType: '',
    degreeType: '',
    rank: '',
    learningStyle: '',
    uniEmail: '',
    uniPhone: '',
    primaryLanguage: '',
    websiteURL: '',
    pictureURL: ''
  });
  const [success, setSuccess] = useState(false);

  const createUni = useMutation(
    newUni => axios.post('https://campus-finder.runasp.net/api/University', newUni),
    {
      onSuccess: () => {
        setSuccess(true);
        setForm({
          name: '',
          description: '',
          location: '',
          requiredDocuments: '',
          universityType: '',
          degreeType: '',
          rank: '',
          learningStyle: '',
          uniEmail: '',
          uniPhone: '',
          primaryLanguage: '',
          websiteURL: '',
          pictureURL: ''
        });
      }
    }
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(false);
    createUni.mutate(form);
  };

  return (
    <div className="p-4 min-vh-100 bg-light d-flex justify-content-center align-items-start">
      <div className=" p-4 " style={{ width: '100%', maxWidth: 500 }}>
        <h5 className="text-center mb-4 ms-5">Create New University</h5>

        {success && (
          <div className="alert alert-success py-2">
            University created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name',           name: 'name',           type: 'text' },
            { label: 'Description',    name: 'description',    type: 'text' },
            { label: 'Location',       name: 'location',       type: 'text' },
            { label: 'Required Docs',  name: 'requiredDocuments', type: 'text' },
            { label: 'University Type',name: 'universityType', type: 'text' },
            { label: 'Degree Type',    name: 'degreeType',     type: 'text' },
            { label: 'Rank',           name: 'rank',           type: 'text' },
            { label: 'Learning Style', name: 'learningStyle',  type: 'text' },
            { label: 'Uni Email',      name: 'uniEmail',       type: 'email' },
            { label: 'Uni Phone',      name: 'uniPhone',       type: 'text' },
            { label: 'Primary Language', name: 'primaryLanguage', type: 'text' },
            { label: 'Website URL',    name: 'websiteURL',     type: 'url' },
            { label: 'Picture URL',    name: 'pictureURL',     type: 'url' }
          ].map(field => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                className="form-control form-dash"
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createUni.isLoading}
            >
              {createUni.isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
