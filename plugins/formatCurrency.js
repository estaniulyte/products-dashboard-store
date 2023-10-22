export function formatCurrency(value) {
  if (typeof value === "string") {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return `$${numericValue.toFixed(2)}`;
    }
  }

  if (typeof value === "number" && !isNaN(value)) {
    if (value == 0) return `$0`;
    else if (value) return `$${value.toFixed(2)}`;
  }

  if (typeof value === "undefined") return "Empty value";

  return "Invalid input. Pass nuber.";
}

export default (context, inject) => {
  inject("formatCurrency", formatCurrency);
};
