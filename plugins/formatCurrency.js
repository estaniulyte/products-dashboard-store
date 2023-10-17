function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export default (context, inject) => {
  inject("formatCurrency", formatCurrency);
};
