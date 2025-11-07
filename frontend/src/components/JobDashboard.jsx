import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [keywords, setKeywords] = useState(''); 

  const API_URL = 'http://localhost:5000'

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/job`);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); 

  const handleScrape = async () => {
    setIsScraping(true);
    try {
      const res= await fetch(`${API_URL}/api/job/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ keywords })
      })
      const data= await res.json();
            
      setTimeout(() => {
        setIsScraping(false);
        setKeywords("")
        fetchJobs(); 
      }, 5000); 

    } catch (err) {
      console.error('Error starting scrape', err);
      setIsScraping(false);
    }
  };

  return (
    <div className="jd-root">
      <header className="jd-header">
        <div className="jd-title">
          <h1>Placement Job Tracker</h1>
          <p className="jd-sub">Scrape and save job listings from target sites</p>
        </div>
        <div className="jd-controls">
          <input
            className="jd-input"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords, e.g. frontend react"
          />
          <button
            className="jd-btn"
            onClick={handleScrape}
            disabled={isScraping}
          >
            {isScraping ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Scraping...
              </>
            ) : (
              'Start Scrape'
            )}
          </button>
        </div>
      </header>

      <main className="jd-main">
        <section className="jd-section">
          <h2 className="section-title">Saved Jobs</h2>

          {jobs.length === 0 ? (
            <div className="empty">
              <p>No jobs saved yet.</p>
              <p>Click "Start Scrape" to fetch listings.</p>
            </div>
          ) : (
            <div className="job-grid">
              {jobs.map(job => (
                <article key={job._id} className="job-card">
                  <div className="card-head">
                    <h3 className="job-title">{job.title}</h3>
                    <span className={`status ${job.status ? job.status : 'unknown'}`}>
                      {job.status ? job.status : 'N/A'}
                    </span>
                  </div>
                  <p className="job-company">{job.company}</p>
                  <div className="card-footer">
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="visit-btn">
                      View Job
                    </a>
                    <small className="date">
                      {job.dateScraped ? new Date(job.dateScraped).toLocaleString() : ''}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default JobDashboard;