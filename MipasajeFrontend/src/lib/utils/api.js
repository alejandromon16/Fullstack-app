import Cookies from 'js-cookie'
import { handleSession } from '$lib/utils/auth';

export const api = (query) => {
  const token = Cookies.get('token');
  return fetch('http://192.168.0.13:4000/graphql/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token  ? {Authorization: `Bearer ${token}`} : {})
    },
    body: JSON.stringify({query})

  })
    .then(async res => {
      // if token expires log user out and remove cookies
      await handleSession(res)
      return await res.json()
    })
    .catch( () => {
      // no network connection so we send here a general error message
      return {
        status: 502,
        message: 'Oops! Something is wrong. Please try later.'
      }
    })
}