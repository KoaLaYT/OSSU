export interface subFn {
    (topic: string, data: any): void;
}

const topics = new Map<string, subFn[]>();

export function subscribe(topic: string, callback: subFn) {
    if (topics.has(topic)) {
        topics.get(topic).push(callback);
    } else {
        topics.set(topic, [callback]);
    }

    const index = topics.get(topic).length - 1;
    return {
        unsubscribe: () => {
            topics.get(topic).splice(index, 1);
        }
    };
}

export function publish(topic: string, data): Promise<any> {
    if (!topics.has(topic)) {
        return;
    }

    return Promise.all(
        topics.get(topic).map(async cb => {
            return await cb(topic, data);
        })
    );
}
