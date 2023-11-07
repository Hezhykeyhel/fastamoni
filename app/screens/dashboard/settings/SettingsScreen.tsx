import React from "react";

import { Box } from "@/components/";
import Tile from "@/components/Tile";
import TitleComponent from "@/components/TitleComponent/TitleComponent";

const SettingsScreen = ({ navigation }) => (
  <Box backgroundColor="white" flex={1}>
    <Box marginTop="Ml" paddingHorizontal="lg">
      <TitleComponent
        handleBackPress={() => navigation.goBack()}
        title="Settings Screen"
      />

      <Tile
        icon="right_arrow"
        onProceed={() => {}}
        text="Set transaction PIN"
      />
    </Box>
  </Box>
);

export default SettingsScreen;
