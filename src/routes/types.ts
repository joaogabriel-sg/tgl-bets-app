type AuthStackParamList = {
  Authentication: undefined;
  Registration: undefined;
  ResetPassword: undefined;
};

type AppStackParamList = {
  Account: undefined;
  Home: undefined;
  NewBet: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
