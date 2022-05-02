import { storify } from "../src/storify";
import { given } from "../src/given";

const hasAge = (obj) => !!obj.age;
const under18 = (obj) => obj.age < 18;
const setAlcoholFalse = (obj) => ({ ...obj, okForAlcohol: false });
const setPharmacyFalse = (obj) => ({ ...obj, okForPharmacy: false });

describe("story", () => {
  const input = {
    age: 12,
  };
  it("should work with basic story", () => {
    expect(
      storify()
        .story(
          storify()
            .setMutableProperty("okForPharmacy")
            .story(given(hasAge).when(under18).then(setPharmacyFalse))
        )
        .story(
          storify()
            .setMutableProperty("okForPharmacy")
            .story(given(hasAge).when(under18).then(setPharmacyFalse))
        )
        .story(
          storify()
            .setMutableProperty("okForAlcohol")
            .story(given(hasAge).when(under18).then(setAlcoholFalse))
        )
        .apply(input)
    ).toEqual({
      age: 12,
      okForPharmacy: false,
      okForAlcohol: false,
    });
  });
  it("should throw an error", () => {
    expect(() => {
      storify()
        .story(given(() => true).then((obj) => (obj.apa = "dapa")))
        .apply({ hej: "hopp" });
    }).toThrowError();
  });
  it("should throw an error", () => {
    expect(() => {
      storify()
        .story(
          storify()
            .story(given(() => true).then((obj) => (obj.apa = "dapa")))
            .setMutableProperty("hejhoj")
        )
        .apply({ hej: "hopp" });
    }).toThrow();
  });
  it("should throw an error", () => {
    expect(() => {
      storify()
        .story(
          storify()
            .story(
              given(() => true).then((obj) => (obj.apa = { dapa: "dapa" }))
            )
            .setMutableProperty("hej.hoj")
        )
        .apply({ hej: "hopp", apa: { dapa: "lapa" } });
    }).toThrow();
  });
  it("should work with nested things", () => {
    expect(
      storify()
        .story(
          storify()
            .setMutableProperty("apa.dapa")
            .story(
              given(() => true).then((obj) => {
                obj.apa = { dapa: "dapa" };
                return obj;
              })
            )
        )
        .apply({ hej: "hopp", apa: { dapa: "lapa" } })
    ).toEqual({ hej: "hopp", apa: { dapa: "dapa" } });
  });
  it("should work with nested things #2", () => {
    expect(
      storify()
        .story(
          storify()
            .setMutableProperty("apa.dapa.lapa")
            .story(
              given(() => true).then((obj) => {
                obj.apa = { dapa: { lapa: "sapa" } };
                return obj;
              })
            )
        )
        .apply({ hej: "hopp", apa: { dapa: { lapa: "napa" } } })
    ).toEqual({ hej: "hopp", apa: { dapa: { lapa: "sapa" } } });
  });
});
