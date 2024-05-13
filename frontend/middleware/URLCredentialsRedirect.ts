import { Middleware } from '@nuxt/types'

const URLCredentialsRedirectMiddleware : Middleware = (context) => {
  if (document.URL) {
    const currentURL = new URL(document.URL)
    if (currentURL.username.length > 0) {
      context.redirect(currentURL.origin)
    }
  }
}

export default URLCredentialsRedirectMiddleware
