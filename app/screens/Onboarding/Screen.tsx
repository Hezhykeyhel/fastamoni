import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { introsec } from "@/assets/images";
import { Box, Button, Image } from "@/components/";
import { wp, wptdp } from "@/constants/";

import Dot from "./Dot";
import { Description, Heading } from "./Words";

const heading = ["Welcome to Fastmoni", "Payment Management"];
const description = [
  "We are here to help you achieve full financial transparency and control",
  "We ensure you have control on what happens with and on your account.",
];

export default function Onboarding({ navigation }: any) {
  // const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const images = [introsec, introsec];
  return (
    <Box flex={1}>
      <Box alignItems="center" flex={1} justifyContent="center">
        <Box flex={0.8}>
          <Animated.ScrollView
            bounces={false}
            horizontal
            onScroll={scrollHandler}
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image) => (
              <Image
                height="100%"
                key={image}
                resizeMode="contain"
                source={image}
                style={{ transform: [{ scale: 0.6 }] }}
                width={wptdp(100)}
              />
            ))}
          </Animated.ScrollView>
        </Box>
        <Box
          flex={0.55}
          justifyContent="space-between"
          paddingBottom="xxl"
          paddingHorizontal="lg"
          paddingTop="md"
          width="100%"
        >
          <Box>
            <Box
              alignItems="center"
              height={wp(47)}
              overflow="hidden"
              width="100%"
            >
              {heading.map((text, index) => (
                <Heading
                  index={index}
                  key={text}
                  text={text}
                  translateX={translateX}
                />
              ))}
            </Box>
            <Box height={wp(45)} overflow="hidden">
              {description.map((text, index) => (
                <Description
                  index={index}
                  key={text}
                  text={text}
                  translateX={translateX}
                />
              ))}
            </Box>
            <Box>
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="center"
                marginBottom="md"
                marginTop="md"
              >
                {images.map((text, index) => (
                  <Dot index={index} key={text} translateX={translateX} />
                ))}
              </Box>
            </Box>
            <Box>
              <Box marginVertical="md">
                <Button
                  backgroundColor="black"
                  label="Sign In"
                  marginHorizontal="lg"
                  marginTop="lg"
                  onPress={() => navigation.navigate("UserSignIn")}
                />
              </Box>
              <Box>
                <Button
                  backgroundColor="black"
                  label="Sign Up"
                  marginHorizontal="lg"
                  marginTop="Ml"
                  onPress={() => navigation.navigate("UserSignUp")}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
