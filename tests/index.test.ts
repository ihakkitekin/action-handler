import Handler, { HandlerOptions } from "./../src/index";

type Storefront = {
  storefront: string;
  id: number;
};

describe("Handler tests", () => {
  it("should create a handler successfully", () => {
    // arrange
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "TR", id: 1 },
      identifierProp: "id"
    };

    // act
    const handler = new Handler<Storefront>(options);

    // assert
    expect(handler.applicants).toBe(options.applicants);
    expect(handler.defaultIdentifier).toBe(options.defaultIdentifier);
    expect(handler.identifier).toBe(options.identifier);
    expect(handler.identifierProp).toBe(options.identifierProp);
  });

  it("should throw not valid identifier error during initialization", () => {
    // arrange
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "FR", id: 3 },
      identifierProp: "id"
    };

    // act & assert
    expect(() => new Handler<Storefront>(options)).toThrowError(
      /^You dont have a valid identifier$/
    );
  });

  it("should return arg1", () => {
    // arrange
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "TR", id: 1 },
      identifierProp: "id"
    };
    const handler = new Handler<Storefront>(options);

    // act
    const result = handler.register<string>("arg1", "arg2");

    // assert
    expect(result).toBe("arg1");
  });
});
