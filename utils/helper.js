export function removeHtmlTags(input) {
  if (input === undefined) {
    return null;
  } else {
    return input.replace(/<[^>]*>/g, "");
  }
}

export const priceFormat = (value) => {
  const formatValue = Intl.NumberFormat("fa-IR", {
    notation: "standard",
    maximumFractionDigits: 3,
  }).format(value);
  return formatValue;
};
