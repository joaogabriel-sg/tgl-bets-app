type AuthStackParamList = {
  Authentication: undefined;
  Registration: undefined;
  ResetPassword: undefined;
  ChangePassword: { token: string };
};

type AppDrawerParamList = {
  Account: undefined;
  Home: undefined;
  NewBet: undefined;
};

export type RootStackParamList = AuthStackParamList & AppDrawerParamList;
