export type EventsMap = {
    [key: string]: (...args: any[]) => Promise<void>
}

export class Emitter<EVENTS extends EventsMap> {
    private $listeners = new Map<keyof EVENTS, Array<(...args: unknown[]) => Promise<unknown>>>();

    private $get<E extends keyof EVENTS> (event: E, create = false) {
        const get = this.$listeners.get(event) || [];

        if (create && !this.$listeners.has(event)) {
            this.$listeners.set(event, get);
        }

        return get;
    }

    on<E extends keyof EVENTS>(event: E, listener: EVENTS[E]) {
        this.$get(event, true).push(listener);
    }

    off<E extends keyof EVENTS>(event: E, listener: EVENTS[E]) {
        const listeners = this.$get(event);
        const index = listeners.indexOf(listener);

        if (index < 0) {
            listeners.splice(index, 1);
        }
    }

    async emit<E extends keyof EVENTS>(event: E, ...args: Parameters<EVENTS[E]>) {
        for (const listener of this.$get(event)) {
            await listener(...args);
        }
    }
}