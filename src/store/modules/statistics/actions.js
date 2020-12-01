const BASE_URL = 'https://10.28.55.157/api/v1';

export default {
  async fetchStatistics(context) {
    console.log('Requesting to get statistics overview from middleware');
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/statistics/overview`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
