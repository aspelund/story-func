import { given } from "../src/given";

describe("given ", () => {
  type AgeCountry = {
    age: number;
    country?: string;
  };

  it("should work for this case", () => {
    const input: AgeCountry = <AgeCountry>{ age: 18, country: "dk" };
    const res = given(<AgeCountry>(obj) => !!obj.age)
      .when(<AgeCountry>(obj) => obj.age >= 18)
      .then(<AgeCountry>(obj) => ({ ...obj, okForPharmacy: true }))
      .apply(input);
    expect(res).toHaveProperty("okForPharmacy", true);
  });
  it("should work for this case #2", () => {
    const input = <AgeCountry>{ age: 18, country: "dk" };
    const res = given(<AgeCountry>(obj) => !!obj.age)
      .when(<AgeCountry>(obj) => obj.age < 18)
      .when(<AgeCountry>(obj) => obj.age >= 18)
      .then(<AgeCountry>(obj) => ({ ...obj, okForPharmacy: true }))
      .apply(input);
    expect(res).toEqual(<AgeCountry>{ age: 18, country: "dk" });
  });
  it("should return object with no pipe", () => {
    type Apa = { apa: string };
    expect(
      given(() => false)
        .then(<Apa>(obj) => {
          obj.hello = "world";
          return obj;
        })
        .apply(<Apa>{ apa: "dapa" })
    ).toEqual(<Apa>{ apa: "dapa" });
  });
  it("should ignore a simple case", () => {
    expect(given().apply({ apa: "dapa" })).toEqual({ apa: "dapa" });
  });
});
