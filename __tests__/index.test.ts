import { given, storify } from "../src";

describe("Export should work", () => {
  it("Should export storify", () => {
    expect(storify).toBeDefined();
  });
  it("Should export storify", () => {
    expect(given).toBeDefined();
  });
});
