type HandlerOptions<T> = {
  applicants: T[];
  identifier: T;
  defaultIdentifier?: T;
};

class Handler<T> {
  private hasInit: boolean = false;
  applicants: T[];
  identifier: T;
  defaultIdentifier: T;

  constructor() {
    // this.identifier = options.identifier;
  }

  public init<T>(options: HandlerOptions<T>) {
    this.hasInit = true;
    if (options.defaultIdentifier) {
        this.defaultIdentifier = options.defaultIdentifier;
    }

    this.applicants = options.applicants;
  }

  public register<T>(...args: T[]): string {
    this.checkInitStatus();

    return typeof Handler;
  }

  private checkInitStatus(): void {
    if (!this.hasInit) throw Error("Handler needs to be initialized.");
  }
}

export default new Handler<HandlerOptions>();
