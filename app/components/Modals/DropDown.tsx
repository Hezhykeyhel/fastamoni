/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { ScrollView } from "react-native";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";

type ListItems = {
  listItems: string[] | any;
  selected: any;
  setSelected: any;
  label: string;
  defaultSubheading: string;
};

const DropDown = (props: ListItems) => {
  const {
    listItems = [
      "Gtbank PLC",
      "UBA",
      "First bank",
      "Stanbic IBTC",
      "Zenith bank",
      "Skye bank",
      "Providus Bank",
    ],
    selected,
    setSelected,
    defaultSubheading,
    label,
  } = props;
  const [selectCategory, setSelectCategory] = useState(false);

  return (
    <Box>
      <Box>
        <Pressable onPress={() => setSelectCategory(!selectCategory)}>
          <Box
            alignItems="center"
            backgroundColor="lightGrey"
            borderRadius={100}
            flexDirection="row"
            height={70}
            justifyContent="space-between"
            marginBottom="sm"
            padding="md"
          >
            <Box>
              <Text variant="boldBody">{label}</Text>
              {selected === "" ? (
                <Text variant="boldBody">{defaultSubheading}</Text>
              ) : (
                <Text variant="boldBody">{selected}</Text>
              )}
            </Box>
            <Icon name="chevron_down" size={20} />
          </Box>
        </Pressable>
        {selectCategory ? (
          <Box
            alignSelf="center"
            backgroundColor="white"
            borderRadius={20}
            height={200}
            marginBottom={selectCategory ? "md" : undefined}
            paddingVertical="xs"
            position="relative"
            width="100%"
          >
            <ScrollView scrollEnabled>
              {listItems.map((value, type) => (
                <Pressable
                  backgroundColor="mainBackground"
                  borderRadius={40}
                  key={type}
                  marginHorizontal="md"
                  onPress={() => {
                    setSelected(value);
                    setSelectCategory(false);
                  }}
                >
                  <Box
                    backgroundColor={selected === value ? "lightGrey" : "white"}
                    paddingHorizontal="sm"
                    paddingVertical="sm"
                  >
                    <Text variant="boldBody">{value}</Text>
                  </Box>
                </Pressable>
              ))}
            </ScrollView>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default DropDown;
