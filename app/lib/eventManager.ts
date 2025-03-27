const logger = (...args: any[]) => {
  console.log(
    `%c[EventManager]`,
    "color: #000; background-color: #fff; padding: 2px 4px; border-radius: 4px;",

    ...args
  );
};

class EventManager<T extends Record<string, any>> {
  public debugLabel?: string;
  constructor(debugLabel?: string) {
    this.debugLabel = debugLabel;
  }

  private eventCallbacks: {
    [K in keyof T]?: ((data: T[K]) => void)[];
  } = {};

  registerEvent<K extends keyof T>(
    eventType: K,
    callback: (data: T[K]) => void
  ): () => void {
    logger(
      `${this.debugLabel} Registering event: ${String(eventType)}`,
      callback
    );

    if (!this.eventCallbacks[eventType]) {
      this.eventCallbacks[eventType] = [];
    }
    this.eventCallbacks[eventType]!.push(callback);

    return () => {
      logger(
        `${this.debugLabel} Unregistering event: ${String(eventType)}`,
        callback
      );

      this.eventCallbacks[eventType] = this.eventCallbacks[eventType]!.filter(
        (cb) => cb !== callback
      );
    };
  }

  triggerEvent<K extends keyof T>(eventType: K, data?: T[K]) {
    logger(`${this.debugLabel} Triggering event: ${String(eventType)}`, data);

    this.eventCallbacks[eventType]?.forEach((callback) => callback(data!));
  }
}

export default EventManager;
