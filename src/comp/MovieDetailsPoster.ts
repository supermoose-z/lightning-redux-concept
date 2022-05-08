
import Lightning from '@lightningjs/core';
import { ReduxAwareComponent } from './ReduxAwareComponent';

export class MovieDetailsPoster extends ReduxAwareComponent
{
    static _template()
    {
        return {
            w: 256,
            h: 400,
            rtt: true,
            Image: {
                w: w => w,
                h: h => h,
                shader: {
                    type: Lightning.shaders.RoundedRectangle,
                    radius: 20,
                }
            },
        }
    }

    get connectToStore(): boolean {
        return false;
    }

    _enable()
    {
        var movie;

        super._enable();

        movie = this.state.movies.movieDetails;

        this.tag('Image').patch({
            src: movie.Poster,
        });
    }
}