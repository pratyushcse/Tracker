import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectTracker from './ProjectTracker';
import ProjectTrackerForm from './ProjectTrackerForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProjectTracker />} />
          <Route path="/admin" element={<ProjectTrackerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
