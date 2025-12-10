/**
 * this entire hono app was only possible because of cj.
 * https://github.com/w3cj/hono-open-api-starter
 * and the following youtube video:
 *
 * https://www.youtube.com/watch?v=sNh9PoM9sUE
 */

import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'

import indexRoute from '@/routes/index.route'
import productsRoute from '@/routes/products/products.index'
import usersRoute from '@/routes/users/users.index'

const routes = [indexRoute, productsRoute, usersRoute]

const app = configureOpenAPI(createApp())

routes.forEach(route => {
    app.route('/', route)
})

export default app
