import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import './Createuni.css';

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

  const [pictureFile, setPictureFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUni = useMutation(
    newUni => axios.post(
      'https://campus-finder.runasp.net/api/University',
      newUni,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ),
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
        setPictureFile(null);
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

    const formData = new FormData();

    // Append fields
    formData.append('Name', form.name);
    formData.append('Description', form.description);
    formData.append('Location', form.location);
    formData.append('RequiredDocuments', form.requiredDocuments);
    formData.append('UniversityType', form.universityType);
    formData.append('DegreeType', form.degreeType);
    formData.append('Rank', form.rank);
    formData.append('LearningStyle', form.learningStyle);
    formData.append('UniEmail', form.uniEmail);
    formData.append('UniPhone', form.uniPhone);
    formData.append('PrimaryLanguage', form.primaryLanguage);
    formData.append('WebsiteURL', form.websiteURL);
    formData.append('PictureURL', form.pictureURL); // optional

    // Append picture file (required by Swagger)
    if (pictureFile) {
      formData.append('Picture', pictureFile);
    }

    // Append dummy Profile.Id — backend requires it
    formData.append('Profile.Id', '00000000-0000-0000-0000-000000000000');

    createUni.mutate(formData);
  };

  return (
    <div className="p-4 min-vh-100 d-flex justify-content-center align-items-start">
      <div className="p-4" style={{ width: '100%', maxWidth: 500 }}>
        <h5 className="text-center mb-4">Create New University</h5>

        {success && (
          <div className="alert alert-success py-2">
            University created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
            { label: 'Location', name: 'location', type: 'text' },
            { label: 'Required Documents', name: 'requiredDocuments', type: 'text' },
            { label: 'University Type', name: 'universityType', type: 'text' },
            { label: 'Degree Type', name: 'degreeType', type: 'text' },
            { label: 'Rank', name: 'rank', type: 'text' },
            { label: 'Learning Style', name: 'learningStyle', type: 'text' },
            { label: 'Uni Email', name: 'uniEmail', type: 'email' },
            { label: 'Uni Phone', name: 'uniPhone', type: 'text' },
            { label: 'Primary Language', name: 'primaryLanguage', type: 'text' },
            { label: 'Website URL', name: 'websiteURL', type: 'url' },
            { label: 'Picture URL', name: 'pictureURL', type: 'url' },
          ].map(field => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                className="form-control"
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Picture (File Upload)</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={e => setPictureFile(e.target.files[0])}
              required
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={createUni.isLoading}>
              {createUni.isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
