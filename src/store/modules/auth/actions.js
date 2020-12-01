import { getPasswordHash } from '../../../api/wca/index.js';
import store from '../../index.js';

export default {
  async login(context, payload) {
    console.log(
      `Reqeusting to login with username=${payload.username} and password=${payload.password}`
    );
    return context.dispatch('auth', {
      ...payload,
      endpoint: 'http://localhost:8085/api/v1/login/'
    });
  },
  async signup(context, payload) {
    console.log(
      `Reqeusting to login with username=${payload.username} and password=${payload.password}`
    );
    return context.dispatch('auth', {
      ...payload,
      endpoint: 'http://localhost:8085/api/v1/register/'
    });
  },
  async auth(context, payload) {
    const passwordHash = await getPasswordHash(payload.password);
    console.log(
      `Hashed password=${payload.password} to new password=${passwordHash}`
    );

    console.log('Requesting to get JWT from middleware');
    const response = await fetch(payload.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: payload.username,
        password: passwordHash
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
    }
    console.log('Response was okay and now setting data to localStorage');

    localStorage.setItem('access_token', responseData.access_token);

    console.log('Now committing user auth data to vuex');
    context.commit('setUser', {
      token: responseData.access_token
    });
  },
  logout(context) {
    console.log('Now removing data from localStorage');
    localStorage.removeItem('token');

    console.log('Now commiting setUser to vuex');
    context.commit('setUser', {
      token: null
    });
  },
  async changePassword(context, payload) {
    const passwordHash = await getPasswordHash(payload.password);
    console.log(
      `Hashed password=${payload.password} to new password=${passwordHash}`
    );

    console.log('Requesting to change password in middleware');
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyArHTXn2ZXg36aPEbWD4jJNtVyFJ1D3xbw`;
    const token = store.getters['auth/token'];
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: passwordHash,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
    }
    console.log('Response was okay and now setting data to localStorage');

    localStorage.setItem('access_token', responseData.access_token);

    console.log('Now dispatching autoLogout to vuex');

    console.log('Now committing user auth data to vuex');
    context.commit('setUser', {
      token: responseData.access_token
    });
  }
};
