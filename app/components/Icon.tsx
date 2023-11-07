/* eslint-disable unused-imports/no-unused-vars */
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

import active_history from "@/assets/svg/active_history.svg";
import active_home from "@/assets/svg/active_home.svg";
import active_profile from "@/assets/svg/active_profile.svg";
import active_settings from "@/assets/svg/active_settings.svg";
import airtel from "@/assets/svg/airtel.svg";
import logo from "@/assets/svg/applogo.svg";
import banklogo from "@/assets/svg/banklogo.svg";
import bigarrow_down from "@/assets/svg/bigarrow_down.svg";
import bigLogo from "@/assets/svg/bigLogo.svg";
import black_profile from "@/assets/svg/black_profile.svg";
import blue_check from "@/assets/svg/blue-check.svg";
import buydata from "@/assets/svg/buydata.svg";
import cabletv from "@/assets/svg/cabletv.svg";
import chatbot from "@/assets/svg/chatbot.svg";
import check from "@/assets/svg/check.svg";
import chevron_back from "@/assets/svg/chevron_back.svg";
import chevron_down from "@/assets/svg/chevron_down.svg";
import clipboard from "@/assets/svg/clipboard.svg";
import close from "@/assets/svg/close.svg";
import copy_clipboard from "@/assets/svg/copy_clipboard.svg";
import edit_photo from "@/assets/svg/edit_photo.svg";
import ekedc from "@/assets/svg/ekedc.svg";
import electricity from "@/assets/svg/electricity.svg";
import eye from "@/assets/svg/eye.svg";
import eye_off from "@/assets/svg/eye_off.svg";
import facebook from "@/assets/svg/facebook.svg";
import failure_smiley from "@/assets/svg/failure_smiley.svg";
import faq from "@/assets/svg/faq.svg";
import fingerprint from "@/assets/svg/fingerprint.svg";
import glo from "@/assets/svg/glo.svg";
import help_icon from "@/assets/svg/help_icon.svg";
import inactive_history from "@/assets/svg/inactive_history.svg";
import inactive_home from "@/assets/svg/inactive_home.svg";
import inactive_profile from "@/assets/svg/inactive_profile.svg";
import inactive_settings from "@/assets/svg/inactive_settings.svg";
import instagram from "@/assets/svg/instagram.svg";
import kuda from "@/assets/svg/kuda.svg";
import linkedin from "@/assets/svg/linkedin.svg";
import logout from "@/assets/svg/logout.svg";
import mtn from "@/assets/svg/mtn.svg";
import nine_mobile from "@/assets/svg/nine_mobile.svg";
import no_profile from "@/assets/svg/no_profile.svg";
import notify from "@/assets/svg/notify.svg";
import paper from "@/assets/svg/paper.svg";
import paystack from "@/assets/svg/paystack.svg";
import pending_smiley from "@/assets/svg/pending_smiley.svg";
import profileImage from "@/assets/svg/profileimage.svg";
import right_arrow from "@/assets/svg/right_arrow.svg";
import right_chevron from "@/assets/svg/right_chevron.svg";
import selectContact from "@/assets/svg/selectContact.svg";
import sentIcon from "@/assets/svg/sentIcon.svg";
import success_smiley from "@/assets/svg/success_smiley.svg";
import support from "@/assets/svg/support.svg";
import tick from "@/assets/svg/tick.svg";
import topup from "@/assets/svg/topup.svg";
import transfer from "@/assets/svg/transfer.svg";
import wallet from "@/assets/svg/wallet.svg";
import whatsapp from "@/assets/svg/whatsapp.svg";
import wifi from "@/assets/svg/wifi.svg";
import zenith from "@/assets/svg/zenith.svg";

type IconFunction = React.FC<SvgProps>;

export const ICONS = {
  active_history,
  active_home,
  active_profile,
  active_settings,
  airtel,
  banklogo,
  bigLogo,
  bigarrow_down,
  black_profile,
  blue_check,
  buydata,
  cabletv,
  chatbot,
  check,
  chevron_back,
  chevron_down,
  clipboard,
  close,
  copy_clipboard,
  edit_photo,
  ekedc,
  electricity,
  eye,
  eye_off,
  facebook,
  failure_smiley,
  faq,
  fingerprint,
  glo,
  help_icon,
  inactive_history,
  inactive_home,
  inactive_profile,
  inactive_settings,
  instagram,
  kuda,
  linkedin,
  logo,
  logout,
  mtn,
  nine_mobile,
  no_profile,
  notify,
  paper,
  paystack,
  pending_smiley,
  profileImage,
  right_arrow,
  right_chevron,
  selectContact,
  sentIcon,
  success_smiley,
  support,
  tick,
  topup,
  transfer,
  wallet,
  whatsapp,
  "wifi-icon": wifi,
  zenith,
};

export type IconName = keyof typeof ICONS;
export type IconProps = SvgProps & {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  stroke?: string;
  outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 24, style, ...props }: IconProps) {
  const IconImpl: IconFunction = ICONS[name as IconName];
  return IconImpl ? (
    <IconImpl height={size} style={style} width={size} {...props} />
  ) : null;
}

export default Icon;
