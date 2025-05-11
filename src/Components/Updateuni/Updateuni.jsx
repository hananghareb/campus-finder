import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Updateuni.css';

export default function UpdateUni() {
  const { id } = useParams(); // ID من الرابط
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
  const [loading, setLoading] = useState(true); // لتحميل البيانات الأولية
  const [error, setError] = useState(false);

  // ✅ Get existing university data
  useEffect(() => {
    axios
      .get(`https://campus-finder.runasp.net/api/University/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch university:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const updateUni = useMutation(
    updatedUni => axios.put(`https://campus-finder.runasp.net/api/University/${id}`, updatedUni),
    {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: (err) => {
        console.error('Update error:', err);
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
    updateUni.mutate(form);
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">Error loading university data.</div>;

  return (
    <div className="p-4 min-vh-100 d-flex justify-content-center align-items-start">
      <div className="p-4" style={{ width: '100%', maxWidth: 500 }}>
        <h5 className="text-center mb-4 ms-5">Update University</h5>

        {success && (
          <div className="alert alert-success py-2">
            University updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
            { label: 'Location', name: 'location', type: 'text' },
            { label: 'Required Docs', name: 'requiredDocuments', type: 'text' },
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
                className="form-control form-dash"
                name={field.name}
                type={field.type}
                value={form[field.name] || ''}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={updateUni.isLoading}
            >
              {updateUni.isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
