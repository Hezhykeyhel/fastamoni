import { createText } from "@shopify/restyle";
import { TextInput as NativeInput } from "react-native";

import { Theme } from "@/constants/theme";

const TextInput = createText<
  Theme,
  React.ComponentProps<typeof NativeInput> & { children?: React.ReactNode }
>(NativeInput);

export type TextInputProps = React.ComponentProps<typeof TextInput>;

export default TextInput;
