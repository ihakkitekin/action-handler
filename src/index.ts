import "reflect-metadata";

export type HandlerOptions<T> = {
  applicants: T[];
  identifier: T;
  defaultIdentifier?: T;
  identifierProp: string;
};

type storeItem = { key: string; value: any };

export default class Handler<T> {
  private winnerIndex: number;
  private store: storeItem[];
  applicants: T[];
  defaultIdentifier?: T;
  identifier: T;
  identifierProp: string;

  constructor(options: HandlerOptions<T>) {
    // bind methods
    this.register = this.register.bind(this);
    this.injectArgument = this.injectArgument.bind(this);
    this.getWinnerIndex = this.getWinnerIndex.bind(this);
    this.getWinner = this.getWinner.bind(this);

    // define properties
    this.applicants = options.applicants;
    this.defaultIdentifier = options.defaultIdentifier;
    this.identifier = options.identifier;
    this.identifierProp = options.identifierProp;
    this.winnerIndex = this.getWinnerIndex();
    this.store = [];

    if (this.winnerIndex < 0) {
      throw Error("You dont have a valid identifier");
    }
  }

  /**
   * Registers an argument from given arguments based on the winner applicant
   * @param  {T[]} ...args
   * @returns T
   */
  public register<T>(key: string, ...args: T[]): void {
    let result: T = args[this.winnerIndex];
    this.store.push({ key, value: result });
  }

  /**
   * Injects an argument to given function based on given key
   * @param  {T[]} ...args
   * @returns T
   */
  public injectArgument(key: string): Function {
    const item: storeItem = this.store.find(item => item.key === key);

    if (!item) {
      throw Error(`No item with key: ${key}`);
    }

    const result = function(
      target: any,
      property: string,
      descriptor: TypedPropertyDescriptor<Function>
    ) {
      if (descriptor === undefined) {
        throw Error(`injectArgument can only be used for 'function' type.`);
      }

      let method = descriptor.value;

      descriptor.value = (...args: any[]) => {
        args.push(item);
        return method.apply(this, args);
      };
    };

    return result;
  }

  /**
   * Returns the index of the winner applicant
   * @returns number
   */
  private getWinnerIndex(): number {
    let winner = this.getWinner(this.identifier);

    if (!winner && this.defaultIdentifier) {
      winner = this.getWinner(this.defaultIdentifier);
    }

    return this.applicants.indexOf(winner);
  }

  /**
   * Returns the winner element of the applicants array based on the prop that
   * is defined in Init
   * @param  {result of the array operation} applicantToFind
   * @returns T
   */
  private getWinner(applicantToFind): T {
    return this.applicants.find(
      (applicant): boolean => {
        return (
          applicant[this.identifierProp] ===
          applicantToFind[this.identifierProp]
        );
      }
    );
  }
}
