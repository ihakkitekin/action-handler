export type HandlerOptions<TType> = {
  applicants: TType[];
  identifier: TType;
  defaultIdentifier?: TType;
  identifierProp: string;
};

export default class Handler<T> {
  private winnerIndex: number;
  applicants: T[];
  identifier: T;
  defaultIdentifier?: T;
  identifierProp: string;

  constructor(options: HandlerOptions<T>){
    if (options.defaultIdentifier) {
      this.defaultIdentifier = options.defaultIdentifier;
    }

    this.identifier = options.identifier;
    this.applicants = options.applicants;
    this.identifierProp = options.identifierProp;
    this.winnerIndex = this.getWinnerIndex();
  }

  
  /**
   * Registers an argument from given arguments based on the config
   * @param  {T[]} ...args
   * @returns T
   */
  public register = <T>(...args: T[]): T => {
    let result: T;

    result = args[this.winnerIndex];

    return result;
  };

  /**
   * Returns the index of the winner applicant
   * @returns number
   */
  private getWinnerIndex = (): number => {
    let winner = this.getWinner(this.identifier);

    if (!winner && this.defaultIdentifier) {
      winner = this.getWinner(this.defaultIdentifier);
    }

    if (!winner) {
      throw new Error("You dont have a valid identifier");
    }

    return this.applicants.indexOf(winner);
  };

  /**
   * Returns the winner element of the applicants array based on the prop that
   * is defined in Init
   * @param  {result of the array operation} applicantToFind
   * @returns T
   */
  private getWinner = (applicantToFind): T => {
    return this.applicants.find(
      (applicant): boolean => {
        return (
          applicant[this.identifierProp] ===
          applicantToFind[this.identifierProp]
        );
      }
    );
  };
}
