
import React, { useEffect, useState } from 'react';
import { getJobReport } from './jenkinsService';
import './JobReports.css';

const JobReports = () => {
  const [uiAutomationReport, setUIAutomationReport] = useState({});
  const [apiAutomationReport, setAPIAutomationReport] = useState({});
  const [uiAutomationStageReport, setUIAutomationStageReport] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Fetch Production job reports
        const uiReport = await getJobReport('UI_Automation');
        setUIAutomationReport(uiReport);

        const apiReport = await getJobReport('API_Automation');
        setAPIAutomationReport(apiReport);

        // Fetch Stage job report
        const stageReport = await getJobReport('UI_Automation_Stage');
        setUIAutomationStageReport(stageReport);
      } catch (error) {
        console.error('Error fetching job reports:', error);
      }
    };

    fetchReports();
  }, []);

  const getAllureReportLink = (jobName) => {
    // Assuming the Allure report link follows a specific format
    return `http://your-jenkins-server/job/${jobName}/lastBuild/allure`;
  };

  return (
    <div className="job-reports">
      <h1>Jenkins Job Reports</h1>

      <h2>Production Jobs</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Passed</th>
            <th>Failed</th>
            <th>Skipped</th>
            <th>Total Tests</th>
            <th>Allure Report</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UI Automation</td>
            <td>{uiAutomationReport.passed || 'N/A'}</td>
            <td>{uiAutomationReport.failed || 'N/A'}</td>
            <td>{uiAutomationReport.skipped || 'N/A'}</td>
            <td>{uiAutomationReport.total || 'N/A'}</td>
            <td>
              <a href={getAllureReportLink('UI_Automation')} target="_blank" rel="noopener noreferrer">
                View Report
              </a>
            </td>
          </tr>
          <tr>
            <td>API Automation</td>
            <td>{apiAutomationReport.passed || 'N/A'}</td>
            <td>{apiAutomationReport.failed || 'N/A'}</td>
            <td>{apiAutomationReport.skipped || 'N/A'}</td>
            <td>{apiAutomationReport.total || 'N/A'}</td>
            <td>
              <a href={getAllureReportLink('API_Automation')} target="_blank" rel="noopener noreferrer">
                View Report
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Stage Jobs</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Passed</th>
            <th>Failed</th>
            <th>Skipped</th>
            <th>Total Tests</th>
            <th>Allure Report</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UI Automation Stage</td>
            <td>{uiAutomationStageReport.passed || 'N/A'}</td>
            <td>{uiAutomationStageReport.failed || 'N/A'}</td>
            <td>{uiAutomationStageReport.skipped || 'N/A'}</td>
            <td>{uiAutomationStageReport.total || 'N/A'}</td>
            <td>
              <a href={getAllureReportLink('UI_Automation_Stage')} target="_blank" rel="noopener noreferrer">
                View Report
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobReports;




//// GET Single test_resport.json from Multiple jenkins job (Multiple Jenkins job)

// import React, { useEffect, useState } from 'react';
// import { getJobReport } from './jenkinsService';
// import './JobReports.css';

// const JobReports = () => {
//   const [uiAutomationReport, setUIAutomationReport] = useState({});
//   const [apiAutomationReport, setAPIAutomationReport] = useState({});

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         // Fetch UI Automation job report
//         const uiReport = await getJobReport('UI_Automation');
//         setUIAutomationReport(uiReport);

//         // Fetch API Automation job report
//         const apiReport = await getJobReport('API_Automation');
//         setAPIAutomationReport(apiReport);
//       } catch (error) {
//         console.error('Error fetching job reports:', error);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <div className="job-reports">
//       <h1>Jenkins Automation Job Run Reports</h1>
//       <table className="report-table">
//         <thead>
//           <tr>
//             <th>Job Name</th>
//             <th>Passed Tests</th>
//             <th>Failed Tests</th>
//             <th>Skipped Tests</th>
//             <th>Total Tests</th>
//             <th>Allure Report</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>UI Automation</td>
//             <td>{uiAutomationReport.passed || 'N/A'}</td>
//             <td>{uiAutomationReport.failed || 'N/A'}</td>
//             <td>{uiAutomationReport.skipped || 'N/A'}</td>
//             <td>{uiAutomationReport.total || 'N/A'}</td>
//             <td>
//               {uiAutomationReport.allureReportLink ? (
//                 <a href={uiAutomationReport.allureReportLink} target="_blank" rel="noopener noreferrer">
//                   View Allure Report
//                 </a>
//               ) : (
//                 'N/A'
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>API Automation</td>
//             <td>{apiAutomationReport.passed || 'N/A'}</td>
//             <td>{apiAutomationReport.failed || 'N/A'}</td>
//             <td>{apiAutomationReport.skipped || 'N/A'}</td>
//             <td>{apiAutomationReport.total || 'N/A'}</td>
//             <td>
//               {apiAutomationReport.allureReportLink ? (
//                 <a href={apiAutomationReport.allureReportLink} target="_blank" rel="noopener noreferrer">
//                   View Allure Report
//                 </a>
//               ) : (
//                 'N/A'
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default JobReports;








//// GET Single test_resport.json from UI_Automation (Single Jenkins job)
// import React, { useState, useEffect } from 'react';
// import { getJobReport } from './jenkinsService'; // Assuming this is the function fetching the job report
// import './JobReports.css'; // Import the external CSS file

// const JobReports = () => {
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const jobReport = await getJobReport();
//         setReport(jobReport);
//       } catch (err) {
//         setError('Error fetching job report');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div className="job-report-container">
//       <h1 className="report-title">Job Report: Automation Report</h1>
//       {report ? (
//         <table className="report-table">
//           <thead>
//             <tr>
//               <th>Total Tests</th>
//               <th>Passed</th>
//               <th>Failed</th>
//               <th>Skipped</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{report.total}</td>
//               <td className="passed">{report.passed}</td>
//               <td className="failed">{report.failed}</td>
//               <td className="skipped">{report.skipped}</td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <div className="no-report">No report available</div>
//       )}
//     </div>
//   );
// };

// export default JobReports;


// import React, { useEffect, useState } from 'react';
// import { getJobReport } from './jenkinsService';

// const JobReports = ({ jobName }) => {
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const data = await getJobReport(jobName);
//         setReport(data);
//       } catch (error) {
//         console.error("Error fetching job report:", error);
//       }
//     };

//     fetchReport();
//   }, [jobName]);

//   return (
//     <div>
//       <h1>Job Report: {jobName}</h1>
//       {report ? (
//         <pre>{JSON.stringify(report, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default JobReports;
