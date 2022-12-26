/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParams = {
  AuthStack: undefined
  MainStack: undefined;
}

export type AuthStackParams = {
  Auth: undefined;
};

export type MainStackParams = {
  Home: undefined;
  Find: undefined;
  AddCardSet:  undefined;
  Analyze: undefined;
  Setting: undefined;
};

export type CardSetInfo = {
  id: string;
  title: string;
  questionLength: number;
  createrName: string;
}

export type CardSetFocusInfo = {
  id: string;
  name: string;
  focusSeconds: number;
}

