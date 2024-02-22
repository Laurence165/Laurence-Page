import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Page of</h1>
        <h2>Laurence Liu</h2>
        <nav>
          <ul>
            <li><a href="https://www.linkedin.com/in/laurence-liu-745616230/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            {/* Make sure to update the href with the actual URL to your resume PDF */}
            <li><a href="/Tech_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
            <li><a href="https://github.com/Laurence165" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
