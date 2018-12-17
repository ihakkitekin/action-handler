import * as _ from 'lodash';

export interface HandlerOptions<T> {
  applicants: T[];
  identifier: T;
  defaultIdentifier?: T;
  identifierProp: string;
}

interface StoreItem {
  key: string;
  value: any;
}

type injectArgumentResultType = (
  target: any,
  property: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) => void;

export default class Handler<T> {
  private winnerIndex: number;
  private store: StoreItem[];
  private applicants: T[];
  private defaultIdentifier?: T;
  private identifier: T;
  private identifierProp: string;

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
      throw Error('You dont have a valid identifier');
    }
  }

  /**
   * Registers an argument from given arguments based on the winner applicant
   * @param  {T[]} args
   * @returns T
   */
  public register<TArg>(key: string, ...args: TArg[]): void {
    const result: TArg = args[this.winnerIndex];
    this.store.push({ key, value: result });
  }

  /**
   * Injects an argument to given function based on given key
   * @param  {string} key
   * @returns Function
   */
  public injectArgument(key: string): injectArgumentResultType {
    const item: StoreItem = _.find(this.store, i => i.key === key);

    if (!item) {
      throw Error(`No item with key: ${key}`);
    }

    const result = function(
      target: any,
      property: string,
      descriptor: TypedPropertyDescriptor<((...args: any[]) => void)>
    ) {
      if (descriptor === undefined) {
        throw Error(`injectArgument can only be used for 'function' type.`);
      }

      const method = descriptor.value;

      descriptor.value = (...args: any[]) => {
        args.push(item.value);
        return method.apply(this, args);
      };
    };

    return result;
  }

  /**
   * Returns an argument with given key
   * @param  {string} key
   * @returns T
   */
  public get(key: string): StoreItem {
    const item: StoreItem = _.find(this.store, i => i.key === key);

    if (!item) {
      throw Error(`No item with key: ${key}`);
    }

    return item;
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
   * @param  {T} applicantToFind
   * @returns T
   */
  private getWinner(applicantToFind): T {
    return _.find(
      this.applicants,
      (applicant): boolean => {
        return (
          applicant[this.identifierProp] ===
          applicantToFind[this.identifierProp]
        );
      }
    );
  }
}
