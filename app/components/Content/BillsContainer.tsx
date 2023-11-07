import React from "react";

import Box from "../Box";
import Icon, { IconName } from "../Icon";
import Text from "../Text";

type BillsProps = {
  icons: IconName | any;
  label: string;
};

const BillsContainer = (props: BillsProps) => {
  const { icons, label } = props;
  return (
    <Box
      alignItems="center"
      flexDirection="column"
      height={80}
      justifyContent="center"
      width={80}
    >
      <Icon name={icons} size={50} />
      <Text marginTop="xs" textAlign="center" variant="body">
        {label}
      </Text>
    </Box>
  );
};

export default BillsContainer;
