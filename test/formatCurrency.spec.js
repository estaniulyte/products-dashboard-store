import { formatCurrency } from "@/plugins/formatCurrency";

describe("formatCurrency", () => {
  it("formats and rounds number to two decimal places and adds dollar sign", () => {
    expect(formatCurrency(80)).toBe("$80.00");
  });

  it("formats currency of 0 to be $0", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats currency of string number", () => {
    expect(formatCurrency("30")).toBe("$30.00");
  });

  it("formats currency of string double number", () => {
    expect(formatCurrency("30.6008")).toBe("$30.60");
  });

  it("formats currency float number", () => {
    expect(formatCurrency(30.5)).toBe("$30.50");
  });

  it("formats negative number", () => {
    expect(formatCurrency(-30.50007)).toBe("$-30.50");
  });

  it("check for text value", () => {
    expect(formatCurrency("SomeText")).toBe("Invalid input. Pass nuber.");
  });

  it("check for empty value", () => {
    expect(formatCurrency()).toBe("Empty value");
  });
});
