const BASE_URL = 'http://localhost:8085/api/v1';

export default {
  async fetchUsers(context) {
    console.log('Requesting to get users from middleware');
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/admin/users`, {
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

    context.commit('setUsers', responseData);
  },
  async deleteUsers(context, payload) {
    console.log('Requesting to delete users from middleware');
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/admin/users/${payload.userId}`, {
      method: 'DELETE',
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

    context.commit('deleteUser', payload);
  }
};
