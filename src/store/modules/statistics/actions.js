const BASE_URL = 'https://e2e-cloud.firebaseio.com';

export default {
  async fetchStatistics(context) {
    console.log('Requesting to get statistics overview from middleware');
    const response = await fetch(`${BASE_URL}/statistics/overview.json`, {
      method: 'GET'
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log('Response was okay.');

    context.commit('setStatistics', responseData);
  }
};
