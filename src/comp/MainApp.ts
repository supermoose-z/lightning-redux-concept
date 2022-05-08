
import { Utils, Router } from '@lightningjs/sdk'

import { MovieBrowser } from './MovieBrowser';
import { MovieDetails } from './MovieDetails';

import { store } from '../store';
import { fetchMovies } from '../store/moviesSlice';

const routes = {
    root: 'home',
    
    // preload movie list on boot
    boot: () => {
        return new Promise((resolve, reject) => {
            store.dispatch(fetchMovies()).then(() => resolve(undefined));
        });
    },

    routes: [
        {
            path: 'home',
            component: MovieBrowser,
        },
        {
            path: 'details/:id',
            component: MovieDetails
        }
    ]
}


export class MainApp extends Router.App
{
	static getFonts() 
	{
		return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
	}

    _setup() 
    {
        Router.startRouter(routes, undefined);
    }
}