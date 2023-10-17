function formatCurrency(value) {
  if (value) return `$${value.toFixed(2)}`;
  return;
}

export default (context, inject) => {
  inject("formatCurrency", formatCurrency);
};
