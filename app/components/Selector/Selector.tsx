/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";

import Box from "../Box";
import Icon from "../Icon";
import Image from "../Image";
import Pressable from "../Pressable";

type SelectorProps = {
  selectArray?:
    | {
        network?: string;
        networkIdentifier?: string;
      }[]
    | any;
  onProceed?: (network: string, networkIdentifier: string) => void;
};
const Selector = (props: SelectorProps) => {
  const [clicked, setClicked] = useState(-1);
  const { selectArray, onProceed } = props;
  const handleClick = (id: number) => {
    setClicked(id);
  };

  return (
    <Box alignItems="center" flexDirection="row" justifyContent="center">
      <>
        {selectArray.map((items, index) => (
          <Pressable
            alignItems="center"
            backgroundColor={index === clicked ? "primary" : "white"}
            borderRadius={10}
            flexDirection="row"
            height={80}
            justifyContent="center"
            key={items.networkIdentifier}
            marginHorizontal="xs"
            marginVertical="md"
            onPress={() => {
              handleClick(index);
              onProceed(items.network, items.networkIdentifier);
            }}
            width={80}
          >
            <Image source={items.network} style={{ height: 50, width: 50 }} />
            <Pressable onPress={() => handleClick(index)}>
              <Box bottom={-30} position="absolute" right={0}>
                {index === clicked ? <Icon name="tick" /> : null}
              </Box>
            </Pressable>
          </Pressable>
        ))}
      </>
    </Box>
  );
};

export default Selector;
