import { getPasswordHash } from '../../../api/wca/index.js';
import store from '../../index.js';

let timer;

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

    //const expiresIn = +responseData.expiresIn * 1000;
    //const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('access_token', responseData.access_token);

    //console.log('Now dispatching autoLogout to vuex');
    //timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

    console.log('Now committing user auth data to vuex');
    context.commit('setUser', {
      token: responseData.access_token
    });
  },
  logout(context) {
    console.log('Now removing data from localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    console.log('Now clearing timer for autoLogout');
    clearTimeout(timer);

    console.log('Now commiting setUser to vuex');
    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    console.log('Now dispatching logout to vuex');
    context.dispatch('logout');
    console.log('Now commiting setAutoLogout to vuex');
    context.commit('setAutoLogout');
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

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    console.log('Now dispatching autoLogout to vuex');
    timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

    console.log('Now committing user auth data to vuex');
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  }
};
