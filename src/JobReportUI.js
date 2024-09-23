import React from 'react';
import JobReports from './JobReports';

const App = () => {
  const jobs = ['Job1', 'Job2', 'Job3'];

  return (
    <div>
      {jobs.map((job) => (
        <JobReports key={job} jobName={job} />
      ))}
    </div>
  );
};

export default App;
