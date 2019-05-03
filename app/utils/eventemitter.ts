export class EventEmitter<T> {
    listeners = []

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            let idx = this.listeners.indexOf(callback);
            if (idx >= 0) this.listeners.splice(idx, 1);
        }
    }

    fire(event: T) {
        for(var cb of this.listeners) {
            try {
                cb(event);
            } catch {
                //ignore
            }
        }
    }
}
