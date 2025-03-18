const logger = (...args: any[]) => {
  console.log(
    `%c[EventManager]`,
    "color: #000; background-color: #fff; padding: 2px 4px; border-radius: 4px;",

    ...args
  );
};

class EventManager<T extends Record<string, any>> {
  private eventCallbacks: {
    [K in keyof T]?: ((data: T[K]) => void)[];
  } = {};

  registerEvent<K extends keyof T>(
    eventType: K,
    callback: (data: T[K]) => void
  ): () => void {
    logger(`Registering event: ${String(eventType)}`, callback);

    if (!this.eventCallbacks[eventType]) {
      this.eventCallbacks[eventType] = [];
    }
    this.eventCallbacks[eventType]!.push(callback);

    return () => {
      logger(`Unregistering event: ${String(eventType)}`, callback);

      this.eventCallbacks[eventType] = this.eventCallbacks[eventType]!.filter(
        (cb) => cb !== callback
      );
    };
  }

  triggerEvent<K extends keyof T>(eventType: K, data?: T[K]) {
    logger(`Triggering event: ${String(eventType)}`, data);

    this.eventCallbacks[eventType]?.forEach((callback) => callback(data!));
  }
}

export default EventManager;
