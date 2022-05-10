
export * from './AppStore';

import Lightning from '@lightningjs/core';
import { AbstractAppStore } from './AppStore';

export function createStateComponentClass<StateT, T extends AbstractAppStore<StateT>>(store: T)
{
    return class extends Lightning.Component
    {
        _unsubscribers: [VoidFunction?] = [];

        get $store(): T
        {
            return store;
        }

        get state(): StateT
        {
            return store.state;
        }

        subscribe(value: (state: StateT) => any, callback: (value?: any, state?: StateT) => void)
        {
            // wrap the given callback in a function that only executes it if this component is enabled
            this.$store.subscribe(
                value, 
                (value?, state?) => {
                    if (this.enabled)
                        callback(value, state);
                }
            );
        }
    }
}