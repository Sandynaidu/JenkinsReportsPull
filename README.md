
# Jenkins Job Reports

This project demonstrates how to fetch and display test reports from two Jenkins jobs: **API_Automation** and **UI_Automation**.

## Goal of the Repo

The goal is to show the report from different Jenkins jobs in a web application. Below is the expected format of the report:
![MultipleReport_AllureLink](https://github.com/user-attachments/assets/3863ac0a-e147-42cb-9d41-878a51bca5bd)


## Getting Started

### Dependencies

* Install jenkins on desktop with port 8080


### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

## Step 1: Create Dummy Jenkins Jobs

1. **Set up Jenkins locally**: Ensure Jenkins is running at [http://localhost:8080](http://localhost:8080).

2. **Create the first Jenkins job (API_Automation)**: Add a build step with the following script:
```
   echo "Hello World!!! What a wonderful day"
   @echo off
   setlocal enabledelayedexpansion

   rem Define test counts
   set "passedCount=133"
   set "failCount=11"
   set "skipCount=21"
   set "totalCount=165"

   rem Create JSON content
   set "json_content={"
   set "json_content=!json_content!"passedCount": !passedCount!,"
   set "json_content=!json_content!"failCount": !failCount!,"
   set "json_content=!json_content!"skipCount": !skipCount!,"
   set "json_content=!json_content!"totalCount": !totalCount!"
   set "json_content=!json_content!}"

   rem Write to JSON file
   echo !json_content! > test_results.json

   endlocal
```
3. **Shows test_results.json as below**:
```
{
  "passedCount": 133,
  "failCount": 11,
  "skipCount": 21,
  "totalCount": 165
}
```
4. Create the second Jenkins job (UI_Automation):
* Add a build step with the following script:
```
echo "Hello World!!! What a wonderful day"

@echo off
setlocal enabledelayedexpansion

rem Define test counts
set "passedCount=10"
set "failCount=2"
set "skipCount=1"
set "totalCount=13"

rem Create JSON content
set "json_content={"
set "json_content=!json_content!"passedCount": !passedCount!,"
set "json_content=!json_content!"failCount": !failCount!,"
set "json_content=!json_content!"skipCount": !skipCount!,"
set "json_content=!json_content!"totalCount": !totalCount!"
set "json_content=!json_content!}"

rem Write to JSON file
echo !json_content! > test_results.json

endlocal
```
5. **Show response in test_results.json as below:**
```
{
  "passedCount": 10,
  "failCount": 2,
  "skipCount": 1,
  "totalCount": 13
}
```
## Step 2:  Set Up React Application
* Getting Started with Create React App
* This project was bootstrapped with Create React App.

## Step 3: Add Code to Fetch Reports
JenkinsService.js:
```
// Set the service
import axios from 'axios';

export const getJobReport = async (jobName) => {
  try {
    // Fetch the workspace data (test_results.json)
    const workspaceData = await axios.get(`http://localhost:8080/job/${jobName}/ws/test_results.json`, {
      auth: {
        username: 'admin',
        password: '11ba45fb912cd3d73eabcc65f1d7d2c32e',
      },
    });

    // Construct the Allure report link
    const allureReportLink = `http://localhost:8080/job/${jobName}/allure/`;


    return {
      total: workspaceData.data.totalCount,
      passed: workspaceData.data.passedCount,
      failed: workspaceData.data.failCount,
      skipped: workspaceData.data.skipCount,
      allureReportLink: allureReportLink
    };
  } catch (error) {
    console.error(`Error fetching report for ${jobName}:`, error);
    return { total: null, passed: null, failed: null, skipped: null };
  }
};
```

## Step 4 : Add JobReports.js
```
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
``` 
## Step 5 : Add JobReports.css
```
/* JobReports.css */

.job-report-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.report-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
}

.report-table th,
.report-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.report-table thead th {
  background-color: #4caf50;
  color: white;
}

.report-table tbody td {
  font-size: 18px;
  font-weight: 500;
}

.passed {
  color: #4caf50;
}

.failed {
  color: #f44336;
}

.skipped {
  color: #ff9800;
}

.loading {
  text-align: center;
  font-size: 20px;
  color: #007bff;
}

.error {
  color: #f44336;
  text-align: center;
  font-size: 18px;
}

.no-report {
  text-align: center;
  font-size: 18px;
  color: #555;
}

``` 

## Step 6: Package.json
```
{
  "name": "jenkins-report-app",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://http://localhost:8080",
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "^3.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
  "start": "react-scripts --openssl-legacy-provider start",
  "build": "react-scripts --openssl-legacy-provider build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
* Note if issue on proxy please add the allow jenkins for proxy in jenkins settings and also add a line of proxy in package.json file
* If issue of cors then update your script in package.json
```
"scripts": {
  "start": "react-scripts --openssl-legacy-provider start",
  "build": "react-scripts --openssl-legacy-provider build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
  }
```

### Executing program

* How to run the program
```
npm start
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
