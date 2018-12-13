import Handler, { HandlerOptions } from "./../src/index";

type Storefront = {
  storefront: string;
  id: number;
};

describe('Handler tests', () => {
  it("should create a handler successfully", () => {
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "TR", id: 1 },
      identifierProp: "id"
    };
    const handler = new Handler<Storefront>(options);
  
    expect(handler.identifier).toBe(options.identifier);
    expect(handler.applicants).toBe(options.applicants);
    expect(handler.identifierProp).toBe(options.identifierProp);
  });

  it("should throw", () => {
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "FR", id: 3 },
      identifierProp: "id"
    };
    const handler = new Handler<Storefront>(options);
  
    expect(Handler).toThrow("You dont have a valid identifier");
  });
  
  it("should return arg1", () => {
    const options: HandlerOptions<Storefront> = {
      applicants: [{ storefront: "TR", id: 1 }, { storefront: "DE", id: 2 }],
      identifier: { storefront: "TR", id: 1 },
      identifierProp: "id"
    };
    const handler = new Handler<Storefront>(options);
  
    const result = handler.register<string>("url1", "url2");
  
    expect(result).toBe("url1");
  });
})
