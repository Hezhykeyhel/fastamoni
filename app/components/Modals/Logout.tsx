import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { RefObject, useMemo } from "react";

import Box from "../Box";
import Button from "../Button";
import Text from "../Text";

type OtpModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  handleClose: () => void;
  onProceed: () => void;
};
const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} opacity={0.4} pressBehavior="close" />
);

const LogoutModal = (props: OtpModalProps) => {
  const { bottomSheetModalRef, handleClose, onProceed } = props;

  const snapPoints = useMemo(() => ["40%", "40%"], []);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      style={{
        zIndex: 99,
      }}
    >
      <Box marginBottom="lg" paddingHorizontal="md">
        <Box marginBottom="lg" paddingHorizontal="md">
          <Text mb="xs" mt="md" variant="bigSubHeading">
            Confirm Logout
          </Text>
          <Text variant="boldBody">Are you sure you want to logout?</Text>
          <Box height={20} />
          <Box alignItems="center" justifyContent="center" marginTop="Ml">
            <Button
              label="Yes"
              onPress={() => {
                onProceed();
              }}
            />
            <Box height={20} />
            <Button
              label="No"
              onPress={() => {
                handleClose();
              }}
            />
          </Box>
        </Box>
      </Box>
    </BottomSheetModal>
  );
};

export default LogoutModal;
