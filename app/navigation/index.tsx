import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Onboarding } from "@/screens/";
import Login from "@/screens/auth/login/Login";
import LoginAnotherUser from "@/screens/auth/login/LoginAnotherUser";
import EmailSentScreen from "@/screens/auth/resetPin/EmailSentScreen";
import ResetPin from "@/screens/auth/resetPin/ResetPin";
import RegistrationWelcomePage from "@/screens/auth/signUp/RegistrationWelcomePage";
import UserSignUp from "@/screens/auth/signUp/UserSignUp";
import PersonalDataScreen from "@/screens/dashboard/profile/personalData/PersonalDataScreen";
import PersonalDataSuccess from "@/screens/dashboard/profile/personalData/PersonalDataSuccess";
import { RootState } from "@/store/store";

import DashboardTab from "./DashboardTab";
import type { AppNavRoutes } from "./types";

export type AppNavScreenProps<Screen extends keyof AppNavRoutes> =
  StackScreenProps<AppNavRoutes, Screen>;

const Stack = createStackNavigator<AppNavRoutes>();

function Navigation() {
  const { userData: user, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen component={DashboardTab} name="DashboardTab" />
            <Stack.Screen component={ResetPin} name="ResetPin" />
            <Stack.Screen component={EmailSentScreen} name="EmailSentScreen" />
            <Stack.Screen
              component={PersonalDataScreen}
              name="PersonalDataScreen"
            />
            <Stack.Screen
              component={PersonalDataSuccess}
              name="PersonalDataSuccess"
            />
          </>
        ) : (
          <>
            <Stack.Screen component={Onboarding} name="Onboarding" />
            <Stack.Screen component={DashboardTab} name="DashboardTab" />
            <Stack.Screen component={Login} name="UserSignIn" />
            <Stack.Screen component={UserSignUp} name="UserSignUp" />
            <Stack.Screen
              component={LoginAnotherUser}
              name="LoginAnotherUser"
            />
            <Stack.Screen
              component={RegistrationWelcomePage}
              name="RegistrationWelcomePage"
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTranslation()(Navigation);
