import Handler from "./../src/index";

type Storefront = {
  storefront: string;
  id: number;
};

test("should return arg1", () => {
  const options = {
    applicants: [{ storefront: "TR", id: 1 }],
    identifier: { storefront: "TR", id: 1 }
  };

  Handler.init<Storefront>(options);

  expect(Handler.register<string>("arg1", "arg2")).toBe("arg1");
});
