import React from 'react';
import JobReports from './JobReports';

const App = () => {
  const jobs = ['HelloWorld']; // Add your Jenkins job names here

  return (
    <div>
      {jobs.map((job) => (
        <JobReports key={job} jobName={job} />
      ))}
    </div>
  );
};

export default App;
