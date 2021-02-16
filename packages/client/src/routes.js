import Home from './routes/Home.svelte'
import {wrap} from 'svelte-spa-router/wrap'

export const routes = {
    '/': Home,
    '/items/:id': wrap({
        asyncComponent: () => import('./routes/Item.svelte')
    }),
    '/results': wrap({
        asyncComponent: () => import('./routes/Results.svelte')
    }),
    '*': wrap({
        asyncComponent: () => import('./routes/NotFound.svelte')
    }),
}
