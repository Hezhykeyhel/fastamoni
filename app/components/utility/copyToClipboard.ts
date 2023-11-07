import * as Clipboard from "expo-clipboard";

/**
 * @param {String} enteredText
 */

export const copyToClipboard = async (enteredText: string) => {
  await Clipboard.setStringAsync(enteredText);
};
