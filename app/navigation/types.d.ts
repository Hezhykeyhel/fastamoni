/* eslint-disable unicorn/prevent-abbreviations */

export type AppNavRoutes = {
  // authentication navigation types
  Onboarding: undefined;
  UserSignIn: undefined;
  UserSignUp: undefined;
  RegistrationWelcomePage: undefined;
  HomeScreen: undefined;
  ResetPin: undefined;
  LoginAnotherUser: undefined;
  EmailSentScreen: undefined;
  ResetSuccessScreen: undefined;
  VerifyResetPin: undefined;
  CompleteSignUp: undefined;
  SetPin: undefined;
  SetPinSuccess: undefined;
  // End of authentication types

  // Home Dashboard types
  DashboardTab: undefined;
  // Security Question types
  SecurityScreen: undefined;

  // AboutUs Screen
  AboutUsScreen: undefined;
  // Support Screen
  SupportScreen: undefined;
  ChatScreen: undefined;
  FaqScreen: undefined;
  TermsOfService: undefined;
  // Change PIN
  ChangePin: undefined;
  // New PIN
  NewPin: {
    changePin: string;
  };
  NewPinSuccess: undefined;
  // Change password
  ChangePassword: undefined;
  // Change password success
  ChangePasswordSuccess: undefined;
  PersonalDataScreen: undefined;
  PersonalDataSuccess: undefined;
  // Transfer Types
  TransferLanding: undefined;
  TransferByWallet: undefined;
  ConfirmTransfer: undefined;
  SuccessTransfer: undefined;
  // Funds Types
  FundLandingScreen: undefined;
  FundByBank: undefined;
  PaystackLanding: undefined;
  PayStackIntegration: undefined;
  // Services Stack Type
  ServicesLanding: undefined;
  PayByAccountNumber: undefined;
  PayWithQr: undefined;
  PayByAccountName: undefined;
  ConfirmPayByAccountNumber: undefined;
  ConfirmPayWithAccountName: undefined;
  PayWithAccountName: undefined;
  ConfirmQrpayment: undefined;
  // Bills payment types
  BillsLandingScreen: undefined;
  // Top Up Screen
  TopUpScreen: undefined;
  ConfirmAirtimeScreen: undefined;
  // Buy Data types
  BuyDataScreen: undefined;
  ConfirmDataScreen: undefined;
  DataSuccess: undefined;
  // Electricity Types
  ElectricityScreen: undefined;
  ConfirmElectricityScreen: undefined;
  // CableTvScreen Types
  CableTvScreen: undefined;
  ConfirmCableScreen: undefined;
  CableTvSuccess: undefined;
};

// Dashboard Bottom tab routes
type MyTabRoutes = {
  HomeDashboard: undefined;
  ProfileScreen: undefined;
  HistoryLanding: undefined;
  SettingsLanding: undefined;
};

export type StackParamsList = AppNavRoutes;
export type BottomStackParamsList = MyTabRoutes;
declare global {
  namespace ReactNavigation {
    type RootParamList = StackParamsList;
    type BottomTabParamList = BottomStackParamsList;
  }
}
