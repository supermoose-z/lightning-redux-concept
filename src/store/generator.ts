
import Lightning from '@lightningjs/core';
import { Unsubscribe } from '@reduxjs/toolkit';

/**
 * Creates a new class that extends from Lightning.Component, that is connected to the specified Redux store. 
 * This class exposes a the following new read-only properties:
 *  - state: the result of store.getState()
 *  - store: the instance of the store passed to this function
 *  - connectToStore: returns true by default, if true the component will subscribe to store updates, if you only want to read state data then override this to return false
 * In addition, it overrides the _enable and _disable lifecycle methods, so make sure you call their implementations in descendent classes
 * To respond to store updates, simply override _storeUpdate
 * @param store The instance of the Redux store you wish to connect to this component class
 * @returns A generated class that extends Lightning.Component and is connected to your Redux store
 */
export function createReduxAwareClass(store)
{
    return class ReduxAwareComponent extends Lightning.Component
    {
        /**
         * Unsubcribe callback to disconnect from the store
         */
        _unsub?: Unsubscribe = undefined;

        /**
         * Returns the current state object
         */
        get state()
        {
            return store.getState();
        }

        /**
         * Returns the connected store instance
         */
        get store()
        {
            return store;
        }

        /**
         * If true this will tell _enable to subscribe to store updates
         */
        get connectToStore()
        {
            return true;
        }

        _enable()
        {
            if (this.connectToStore)
                this._unsub = store.subscribe(this._storeUpdate.bind(this));

            super._enable();
        }

        _disable()
        {
            if (this._unsub != undefined)
                this._unsub();

            super._disable();
        }

        _storeUpdate()
        {

        }
    }
}
