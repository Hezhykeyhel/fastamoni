/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { palette } from "@/constants/theme";

import Box from "../Box";
import Text from "../Text";
import { FormatMoney, formatMoney } from "../utility/utils";

type TotalCardProps = {
  amount?: any;
  fees?: string;
  total?: any;
  defaultView?:
    | "showDefault"
    | "showAirtimeCheckout"
    | "showDataCheckout"
    | "checkoutElectricity"
    | "CheckoutCableTv";
  phoneNumber?: string;
  customerId?: string;
  provider?: string;
  packages?: string;
  biller?: string;
  accountName?: string;
  network?: string;
  dataBundle?: string;
  networkTotal?: any;
};

const TotalCard = (props: TotalCardProps) => {
  const {
    amount,
    fees = "0000",
    total,
    defaultView = "showDefault",
    network,
    dataBundle,
    networkTotal,
    phoneNumber,
    biller,
    accountName = "Opeoluwa Samuel",
    customerId,
    packages,
    provider,
  } = props;
  return (
    <>
      {defaultView === "showDefault" && (
        <Box
          backgroundColor="white"
          borderRadius={8}
          paddingHorizontal="sm"
          paddingVertical="md"
          style={{
            elevation: 4,
            shadowColor: palette.black,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="xs"
          >
            <Text variant="subHeading">Amount:</Text>
            <Text color="primary" variant="subHeading">
              {amount}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="xs"
          >
            <Text variant="subHeading">Fees:</Text>
            <Text color="primary" variant="subHeading">
              {`\u20A6`}
              {fees}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="xs"
          >
            <Text variant="subHeading">Total:</Text>
            <Text color="primary" variant="subHeading">
              {total}
            </Text>
          </Box>
        </Box>
      )}
      {defaultView === "showAirtimeCheckout" && (
        <Box
          backgroundColor="white"
          borderRadius={8}
          paddingHorizontal="sm"
          paddingVertical="md"
          style={{
            elevation: 4,
            shadowColor: palette.black,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Mobile Number:</Text>
            <Text color="primary" variant="subHeading">
              {phoneNumber}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Network</Text>
            <Text
              color="primary"
              textTransform="uppercase"
              variant="subHeading"
            >
              {network}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Amount:</Text>
            <Text color="primary" variant="subHeading">
              {`\u20A6`}
              {networkTotal}
            </Text>
          </Box>
        </Box>
      )}
      {defaultView === "showDataCheckout" && (
        <Box
          backgroundColor="white"
          borderRadius={8}
          paddingHorizontal="sm"
          paddingVertical="md"
          style={{
            elevation: 4,
            shadowColor: palette.black,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Mobile Number:</Text>
            <Text color="primary" variant="subHeading">
              {phoneNumber}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Network</Text>
            <Text
              color="primary"
              textTransform="uppercase"
              variant="subHeading"
            >
              {network}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Data Bundle:</Text>
            <Text color="primary" variant="subHeading">
              {dataBundle}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Amount:</Text>
            <Text color="primary" variant="subHeading">
              {formatMoney(networkTotal)}
            </Text>
          </Box>
        </Box>
      )}
      {defaultView === "checkoutElectricity" && (
        <Box
          backgroundColor="white"
          borderRadius={8}
          paddingHorizontal="sm"
          paddingVertical="md"
          style={{
            elevation: 4,
            shadowColor: palette.black,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Customer ID:</Text>
            <Text color="primary" variant="subHeading">
              {customerId}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Provider:</Text>
            <Text
              color="primary"
              textTransform="uppercase"
              variant="subHeading"
            >
              {provider}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Package:</Text>
            <Text color="primary" variant="subHeading">
              {packages}...
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Account Name:</Text>
            <Text color="primary" variant="subHeading">
              {accountName}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Amount:</Text>
            <Text color="primary" variant="subHeading">
              {`\u20A6`}
              {FormatMoney(amount)}
            </Text>
          </Box>
        </Box>
      )}
      {defaultView === "CheckoutCableTv" && (
        <Box
          backgroundColor="white"
          borderRadius={8}
          paddingHorizontal="sm"
          paddingVertical="md"
          style={{
            elevation: 4,
            shadowColor: palette.black,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Customer ID:</Text>
            <Text color="primary" variant="subHeading">
              {customerId}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Biller:</Text>
            <Text
              color="primary"
              textTransform="uppercase"
              variant="subHeading"
            >
              {biller}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Package:</Text>
            <Text color="primary" variant="subHeading">
              {packages}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Account Name:</Text>
            <Text color="primary" variant="subHeading">
              {accountName}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="xs"
            paddingVertical="sm"
          >
            <Text variant="subHeading">Amount:</Text>
            <Text color="primary" variant="subHeading">
              {`\u20A6`}
              {FormatMoney(amount)}
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TotalCard;
