const axios = require('axios');
const { getZoomOAuthToken } = require('./zoomOAuth');

const createZoomMeeting = async (topic, startTime, duration) => {
  const token = await getZoomOAuthToken();

  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        type: 2,
        start_time: startTime,
        duration,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw error;
  }
};

module.exports = { createZoomMeeting };
