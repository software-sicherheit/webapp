const BASE_URL = 'https://e2e-cloud.firebaseio.com';

export default {
  async fetchUsers(context) {
    console.log('Requesting to get users from middleware');
    const response = await fetch(`${BASE_URL}/admin/users.json`, {
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

    context.commit('setUsers', responseData);
  },
  async deleteUsers(context, payload) {
    console.log('Requesting to delete users from middleware');
    const response = await fetch(
      `${BASE_URL}/admin/users/${payload.userId}.json`,
      {
        method: 'DELETE'
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log('Response was okay.');

    context.commit('deleteUser', payload);
  }
};
