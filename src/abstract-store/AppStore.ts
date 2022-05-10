

export type StateUpdateHandler<T> = (state:T) => void;

export abstract class AbstractAppStore<T>
{
    _listeners: [
        {
            lastValue: any,
            value(state: T): any,
            callback(value?: any, state?: T): void,
        }?
    ] = [];

    abstract get state(): T;

    notifyStateUpdated()
    {
        for(const entry of this._listeners)
        {
            const value = entry.value(this.state);
            
            if (value !== entry.lastValue) 
            {
                entry.lastValue = value;
                entry.callback(value, this.state);
            }
        }
    }

    _unsubscribe(entry: any)
    {
        var pos = this._listeners.indexOf(entry);

        if (pos >= 0)
            this._listeners.splice(pos, 1);
    }

    subscribe(value: (state: T) => any, callback: (value: any, state: T) => void): VoidFunction
    {
        const entry = {
            lastValue: value(this.state),
            value, 
            callback
        };

        this._listeners.push(entry);

        return () => this._unsubscribe(entry);
    }
}