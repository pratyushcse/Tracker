import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectTrackerForm.css';
import { Link } from 'react-router-dom'; 

function ProjectTrackerForm() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    registerNumber: '',
    studentName: '',
    topic: '',
    link: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const backendURL = 'http://localhost:8012/students'; // Adjust to your backend endpoint

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(backendURL)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post(backendURL, form)
      .then(response => {
        setStudents([...students, response.data]);
        setForm({ registerNumber: '', studentName: '', topic: '', link: '' });
      })
      .catch(error => console.error("Error adding student:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`${backendURL}/${id}`)
        .then(() => setStudents(students.filter(student => student.id !== id)))
        .catch(error => console.error("Error deleting student:", error));
    }
  };

  const handleEditClick = (student) => {
    setIsEditing(true);
    setCurrentStudent(student);
    setForm({
      registerNumber: student.registerNumber,
      studentName: student.studentName,
      topic: student.topic,
      link: student.link
    });
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    axios.put(`${backendURL}/${currentStudent.id}`, form)
      .then(response => {
        setStudents(students.map(student => 
          student.id === currentStudent.id ? response.data : student
        ));
        setIsEditing(false);
        setCurrentStudent(null);
        setForm({ registerNumber: '', studentName: '', topic: '', link: '' });
      })
      .catch(error => console.error("Error updating student:", error));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentStudent(null);
    setForm({ registerNumber: '', studentName: '', topic: '', link: '' });
  };

  return (
    <div className="container">
      <h1 className="tracker-heading">STUDENT PROJECT TRACKER</h1>

      {/* Add/Edit Form */}
      <div className="form-container">
        <h2 className="form-heading">{isEditing ? "Edit Student" : "Add New Student"}</h2>
        <form onSubmit={isEditing ? handleUpdateStudent : handleAddStudent} className="student-form">
          <div className="form-group">
            <label className="form-label">Register Number</label>
            <input
              type="text"
              name="registerNumber"
              value={form.registerNumber}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={form.studentName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Link</label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {isEditing ? "Update Student" : "Add Student"}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancelEdit} className="btn-cancel">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Student Table */}
      <table className="student-table">
        <thead className="table-head">
          <tr>
            <th className="table-header">Register Number</th>
            <th className="table-header">Student Name</th>
            <th className="table-header">Project Title</th>
            <th className="table-header">Project Link</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {students.map(student => (
            <tr key={student.id} className="table-row">
              <td className="table-data">{student.registerNumber}</td>
              <td className="table-data">{student.studentName}</td>
              <td className="table-data">{student.topic}</td>
              <td className="table-data">
                <a href={student.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project
                </a>
              </td>
              <td className="table-data">
                <button onClick={() => handleEditClick(student)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(student.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="link-button">Home Page</Link>
    </div>
  );
}

export default ProjectTrackerForm;