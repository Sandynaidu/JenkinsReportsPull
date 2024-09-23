// Get 
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

    return {
      total: workspaceData.data.totalCount,
      passed: workspaceData.data.passedCount,
      failed: workspaceData.data.failCount,
      skipped: workspaceData.data.skipCount,
    };
  } catch (error) {
    console.error(`Error fetching report for ${jobName}:`, error);
    return { total: null, passed: null, failed: null, skipped: null };
  }
};






// Get the data of remote jenkins job with the api http://localhost:8080/job/HelloWorld/lastBuild/api/json
// import axios from 'axios';

// export const getJobReport = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/job/HelloWorld/lastBuild/api/json', {
//       auth: {
//          username: 'admin',
//         password: '11ba45fb912cd3d73eabcc65f1d7d2c32e'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching job report:', error);
//     throw error;
//   }
// };