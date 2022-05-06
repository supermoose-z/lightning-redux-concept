
import { Utils, Router } from '@lightningjs/sdk'

import { MovieBrowser } from './MovieBrowser';
import { MovieDetails } from './MovieDetails';

import { store } from '../store';

const routes = {
    root: 'home',
    
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