/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { FlatList } from "react-native";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";

type SelectorProps = {
  selectArray?:
    | {
        values?: string;
        setValues?: string;
      }[]
    | any;
  clicked?: any;
  setClicked?: any;
  onProceed?: (values: string, setValues: string) => void;
};
const SelectText = (props: SelectorProps) => {
  const { selectArray, onProceed, clicked, setClicked = -1 } = props;
  const handleClick = (id: number) => {
    setClicked(id);
  };

  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      paddingHorizontal="md"
    >
      <>
        <FlatList
          data={selectArray}
          numColumns={3}
          renderItem={({ item, index }) => (
            <Box
              alignItems="center"
              flex={1}
              justifyContent="center"
              marginHorizontal="xs"
            >
              <Pressable
                alignItems="center"
                backgroundColor={index === clicked ? "primary" : "white"}
                borderRadius={10}
                flexDirection="row"
                height={110}
                justifyContent="center"
                key={item.setValues}
                marginVertical="md"
                onPress={() => {
                  handleClick(index);
                  onProceed(item.values, item.setValues);
                }}
                width={110}
              >
                <Text
                  color={index === clicked ? "white" : "textColorTint"}
                  variant="header"
                >
                  {`\u20A6`}
                  {item.setValues}
                </Text>
                <Pressable onPress={() => handleClick(index)}>
                  <Box bottom={-40} position="absolute" right={-20}>
                    {index === clicked ? <Icon name="tick" /> : null}
                  </Box>
                </Pressable>
              </Pressable>
            </Box>
          )}
        />
        {/* {selectArray.map((item, index) => (
        ))} */}
      </>
    </Box>
  );
};

export default SelectText;
