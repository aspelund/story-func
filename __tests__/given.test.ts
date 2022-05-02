import { given } from "../src/given";

describe("given ", () => {
  it("should work for this case", () => {
    const input = { age: 18, country: "dk" };
    const res = given((obj) => !!obj.age)
      .when((obj) => obj.age >= 18)
      .then((obj) => ({ ...obj, okForPharmacy: true }))
      .apply(input);
    expect(res).toHaveProperty("okForPharmacy", true);
  });
  it("should work for this case #2", () => {
    const input = { age: 18, country: "dk" };
    const res = given((obj) => !!obj.age)
      .when((obj) => obj.age < 18)
      .when((obj) => obj.age >= 18)
      .then((obj) => ({ ...obj, okForPharmacy: true }))
      .apply(input);
    expect(res).toEqual({ age: 18, country: "dk" });
  });
  it("should return object with no pipe", () => {
    expect(
      given(() => false)
        .then((obj) => {
          obj.hello = "world";
          return obj;
        })
        .apply({ apa: "dapa" })
    ).toEqual({ apa: "dapa" });
  });
  it("should ignore a simple case", () => {
    expect(given().apply({ apa: "dapa" })).toEqual({ apa: "dapa" });
  });
});
