import { storify } from "../src/storify";
import { given } from "../src/given";

type ApaHej = {
  apa: string;
  hej: string;
};
type HejApaDapa = {
  hej: string;
  apa: {
    dapa: string;
  };
};
type HejApaDapaLapa = {
  hej: string;
  apa: {
    dapa: {
      lapa: string;
    };
  };
};

const hasAge = <AgeCountry>(obj) => !!obj.age;
const under18 = <AgeCountry>(obj) => obj.age < 18;
const setAlcoholFalse = <AgeCountry>(obj) => ({ ...obj, okForAlcohol: false });
const setPharmacyFalse = <AgeCountry>(obj) => ({
  ...obj,
  okForPharmacy: false,
});

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
        .story(
          given(<ApaHej>(obj) => true).then(<ApaHej>(obj) => {
            obj.apa = "dapa";
            return obj;
          })
        )
        .apply(<ApaHej>{ hej: "hopp" });
    }).toThrowError();
  });
  it("should throw an error", () => {
    expect(() => {
      storify()
        .story(
          storify()
            .story(
              given(<ApaHej>(obj) => true).then(<ApaHej>(obj) => {
                obj.apa = "dapa";
                return obj;
              })
            )
            .setMutableProperty("hejhoj")
        )
        .apply(<ApaHej>{ hej: "hopp" });
    }).toThrow();
  });
  it("should throw an error", () => {
    expect(() => {
      storify()
        .story(
          storify()
            .story(
              given(<HejApaDapa>(obj) => true).then(<HejApaDapa>(obj) => {
                obj.apa = { dapa: "dapa" };
                return obj;
              })
            )
            .setMutableProperty("hej.hoj")
        )
        .apply(<HejApaDapa>{ hej: "hopp", apa: { dapa: "lapa" } });
    }).toThrow();
  });
  it("should work with nested things", () => {
    expect(
      storify()
        .story(
          storify()
            .setMutableProperty("apa.dapa")
            .story(
              given(<HejApaDapa>(obj) => true).then(<HejApaDapa>(obj) => {
                obj.apa = { dapa: "dapa" };
                return obj;
              })
            )
        )
        .apply(<HejApaDapa>{ hej: "hopp", apa: { dapa: "lapa" } })
    ).toEqual(<HejApaDapa>{ hej: "hopp", apa: { dapa: "dapa" } });
  });
  it("should work with nested things #2", () => {
    expect(
      storify()
        .story(
          storify()
            .setMutableProperty("apa.dapa.lapa")
            .story(
              given(<HejApaDapaLapa>(obj) => true).then(
                <HejApaDapaLapa>(obj) => {
                  obj.apa = { dapa: { lapa: "sapa" } };
                  return obj;
                }
              )
            )
        )
        .apply(<HejApaDapaLapa>{ hej: "hopp", apa: { dapa: { lapa: "napa" } } })
    ).toEqual(<HejApaDapaLapa>{ hej: "hopp", apa: { dapa: { lapa: "sapa" } } });
  });
});
