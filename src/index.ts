export type HandlerOptions<T> = {
  applicants: T[];
  identifier: T;
  defaultIdentifier?: T;
  identifierProp: string;
};

export default class Handler<T> {
  private winnerIndex: number;
  applicants: T[];
  defaultIdentifier?: T;
  identifier: T;
  identifierProp: string;

  constructor(options: HandlerOptions<T>){
    // bind methods
    this.register = this.register.bind(this);
    this.getWinnerIndex = this.getWinnerIndex.bind(this);
    this.getWinner = this.getWinner.bind(this);

    // define properties
    this.applicants = options.applicants;
    this.defaultIdentifier = options.defaultIdentifier;
    this.identifier = options.identifier;
    this.identifierProp = options.identifierProp;
    this.winnerIndex = this.getWinnerIndex();
    
    if (this.winnerIndex < 0) {
      throw Error("You dont have a valid identifier");
    }
  }
  
  /**
   * Registers an argument from given arguments based on the winner applicant
   * @param  {T[]} ...args
   * @returns T
   */
  public register<T>(...args: T[]): T {
    let result: T = args[this.winnerIndex];

    return result;
  };

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
  };

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
  };
}
