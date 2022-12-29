/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParams = {
  AuthStack: undefined
  MainStack: undefined;
  ViewCardSet: { cardSetId: string };
}

export type AuthStackParams = {
  Auth: undefined;
};

export type MainStackParams = {
  Home: undefined;
  Find: undefined;
  AddCardSet:  { cardSetId: string };
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

export type CardSetCompleteInfo = {
  id: string;
  name: string;
  questions: CardSetQuestionInfo[];
}

export type CardSetQuestionInfo = {
  id: string;
  question: string;
  answer: string;
}
