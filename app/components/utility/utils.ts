export const FormatMoney = (number_: any) => {
  const n = String(number_);
  const p = n.indexOf(".");
  return n.replaceAll(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, index) =>
    p < 0 || index < p ? `${m},` : m,
  );
};

export const formatMoney = (text: string) => {
  // Remove all non-numeric characters
  const cleanedText = text.replaceAll(/[^\d.]/g, "");

  // Split the cleaned string into naira and values
  const [naira, values] = cleanedText.split(".");

  // Add commas to the naira portion of the string
  const formattedNaira = naira.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the naira and values with a period
  const formattedText = values ? `${formattedNaira}.${values}` : formattedNaira;

  // Add the dollar sign to the beginning of the string
  return `${`\u20A6`}${formattedText}`;
};

export const updatedFormattedMoney = (
  amount: number,
  currencySymbol = `\u20A6`,
): string => {
  const formattedAmount = amount
    .toFixed(2)
    .replaceAll(/\d(?=(\d{3})+\.)/g, "$&,");
  return `${currencySymbol}${formattedAmount}`;
};
