function formatCurrency(value) {
  if (value == 0) return `$0`;
  else if (value) return `$${value.toFixed(2)}`;
  return;
}

export default (context, inject) => {
  inject("formatCurrency", formatCurrency);
};
