import React from "react";

import { Box } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import Tile from "@/components/Tile";
import TitleComponent from "@/components/TitleComponent/TitleComponent";

const SettingsScreen = ({ navigation }) => (
  <BlurryContainer shades="blur">
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
  </BlurryContainer>
);

export default SettingsScreen;
