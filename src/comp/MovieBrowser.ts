

import Lightning from '@lightningjs/core';

import { MovieList } from './MovieList';
import { CurrentMoviePoster } from './CurrentMoviePoster';

import { StageSize } from './const';

export class MovieBrowser extends Lightning.Component
{
    static _template()
    {
        return {
            Poster: { 
                type: CurrentMoviePoster,
                x: 0,
                y: 0,
                w: StageSize.width,
                h: StageSize.height,
            },

            Movies: {
                type: MovieList,
                x: 10,
                y: 10,
                w: StageSize.width,
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