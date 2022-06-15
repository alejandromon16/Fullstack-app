import * as cookie from 'cookie'

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.user = cookies.user
  event.locals.token = cookies.token
  event.locals.role = cookies.role
  return await resolve(event)
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
  return {
    token: request.locals.token,
    user: request.locals.user ? request.locals.user : null,
    role: request.locals.role ? request.locals.role : null
  }
}
