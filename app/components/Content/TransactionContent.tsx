import React from "react";

import Box, { BoxProps } from "../Box";
import Icon, { IconName } from "../Icon";
import Text from "../Text";
import { formatMoney } from "../utility/utils";

type ContentProps = {
  icons?: IconName | any;
  name?: string;
  date?: string;
  status: string;
  price: string;
  boxStyle?: BoxProps;
  priceStatus?: "pending" | "success" | "cancelled" | "failed" | string;
};

const TransactionContent = (props: ContentProps) => {
  const { icons, name, boxStyle, date, price, priceStatus, status } = props;

  return (
    <Box
      alignItems="center"
      borderRadius={8}
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical="sm"
      {...boxStyle}
    >
      <Box alignItems="center" flexDirection="row" justifyContent="center">
        {priceStatus === "success" && <Icon name="success_smiley" size={30} />}
        {priceStatus === "cancelled" && (
          <Icon name="failure_smiley" size={30} />
        )}
        {priceStatus === "pending" && <Icon name="pending_smiley" size={30} />}
        {priceStatus === "failed" && <Icon name="failure_smiley" size={30} />}
        <Box marginHorizontal="sm">
          <Text variant="subHeading">{name}</Text>
          <Text variant="body">{date}</Text>
          <Text variant="body">{status}</Text>
        </Box>
      </Box>
      {priceStatus === "success" && (
        <Text color="success" variant="subHeading">
          {formatMoney(price)}
        </Text>
      )}
      {priceStatus === "pending" && (
        <Text color="warning" variant="subHeading">
          {formatMoney(price)}
        </Text>
      )}
      {priceStatus === "cancelled" && (
        <Text color="red" variant="subHeading">
          {formatMoney(price)}
        </Text>
      )}
    </Box>
  );
};

export default TransactionContent;
