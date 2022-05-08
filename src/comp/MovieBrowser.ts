

import Lightning from '@lightningjs/core';

import { MovieList } from './MovieList';
import { CurrentMoviePoster } from './CurrentMoviePoster';

export class MovieBrowser extends Lightning.Component
{
    static _template()
    {
        return {
            Poster: { 
                type: CurrentMoviePoster,
                x: 0,
                y: 0,
                w: 1280,
                h: 720,
            },

            Movies: {
                type: MovieList,
                x: 10,
                y: 10,
                w: 1280,
                h: 400,
                itemWidth: 256,
            }
        }
    }

    _getFocused()
    {
        return this.tag('Movies');
    }
}