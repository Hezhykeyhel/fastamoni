import { Linking } from "react-native";

const aboutUs = () => {
  Linking.openURL(`https://www.fastamoni.com/about`);
};
const faq = () => {
  Linking.openURL(`https://www.fastamoni.com/faq`);
};
const termsCondition = () => {
  Linking.openURL(`https://www.fastamoni.com/t&c`);
};

export const profileNavigation = [
  // {
  //   icon: "right_arrow",
  //   route: "SecurityScreen",
  //   text: "Security",
  // },
  {
    icon: "right_arrow",
    onClick: termsCondition,
    text: "Terms and Condition",
  },
  {
    icon: "right_arrow",
    onClick: faq,
    text: "Frequently asked questions",
  },
  {
    icon: "right_arrow",
    onClick: aboutUs,
    text: "About Us",
  },
];
