
import Lightning from '@lightningjs/core';
import { ReduxAwareComponent } from './ReduxAwareComponent';
import { StateComponent } from './StateComponent';

export class MovieDetailsPoster extends StateComponent
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

        movie = this.state.movieDetails;

        this.tag('Image').patch({
            src: movie.Poster,
        });
    }
}