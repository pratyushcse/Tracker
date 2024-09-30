import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectTracker.css';
import { Link } from 'react-router-dom';

function ProjectTracker() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8012/students')  // Adjust URL to your backend endpoint
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="tracker-heading">STUDENT PROJECT TRACKER</h1>
      <table className="student-table">
        <thead className="table-head">
          <tr>
            <th className="table-header">Register Number</th>
            <th className="table-header">Student Name</th>
            <th className="table-header">Project Title</th>
            <th className="table-header">Project Link</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin" className="link-button">ADMIN PAGE</Link>
    </div>
  );
}

export default ProjectTracker;