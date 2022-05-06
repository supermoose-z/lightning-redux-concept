
import Lightning from '@lightningjs/core';

export class MainApp extends Lightning.Application
{
    static _template()
    {
        return {
            BG: {
                x: 0,
                y: 0,
                w: 1280,
                h: 720,
                rect: true,
                color: 0xFF000000,
            }
        }
    }
}