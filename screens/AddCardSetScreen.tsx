import styled from "styled-components/native";
import Card from "../components/atoms/Card";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useEffect, useRef } from "react";
import { TextInput } from "react-native";
import useCardSetData from "../hooks/useCardSetData";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MainStackParams } from "../types";

type Props = {
    navigation: NativeStackNavigationProp<MainStackParams, "AddCardSet">;
    route: RouteProp<MainStackParams, "AddCardSet">;
}

export default function AddCardSetScreen({ navigation, route }: Props) {
    const cardQuestionRef = useRef<TextInput>(null)
    const cardAnswerRef = useRef<TextInput>(null)

    const {
        cardsetData,
        cardData,
        deleteCardsetQuestionAndAnswer,
        handleNavigateIndex,
        updateCardsetTitleFrontendOnChange,
        updateCardsetTitleBackendOnBlur,
        updateCardsetQuestionAndAnswerFrontendOnChange,
        updateCardsetQuestionAndAnswerBackendOnBlur
    } = useCardSetData(route.params?.cardSetId ?? undefined)

    // clear navigation history
    useEffect(() => {
        
      navigation.setParams({ cardSetId: undefined })

    }, [navigation])
    



    return (
        <AddCardSetScreenContainer>

            <FinishedButtonContainer>
                <FinishedButton onPress={() => navigation.navigate("Home")}>
                    <FinishedButtonLabel>完成</FinishedButtonLabel>
                </FinishedButton>
            </FinishedButtonContainer>

            <ScreenTitle>
                建立卡片冊
            </ScreenTitle>

            <CardSetNameInput
                placeholder="卡冊名稱"
                placeholderTextColor="#8D8C8C"
                value={cardsetData?.name}
                onChangeText={(text) => { updateCardsetTitleFrontendOnChange(text) }}
                onBlur={e => { updateCardsetTitleBackendOnBlur(e.nativeEvent.text) }}
            />

            <Card
                style={{ height: 150, marginTop: 40, marginBottom: 20, width: "100%" }}
                cardColor="#fff"
                isShadow={true}
                onPressCallback={() => {
                    cardQuestionRef.current?.focus()
                }}
            >
                <CardContainer>
                    <CardTextInput
                        placeholder="輸入卡片詞語"
                        placeholderTextColor="#8D8C8C"
                        ref={cardQuestionRef}
                        value={cardData?.question}
                        onBlur={e => { updateCardsetQuestionAndAnswerBackendOnBlur(e.nativeEvent.text, cardData?.answer) }}
                        onChangeText={(text) => { updateCardsetQuestionAndAnswerFrontendOnChange(text, cardData?.answer) }}
                    />
                </CardContainer>
            </Card>

            <Card
                style={{ height: 200, marginTop: 10, marginBottom: 5, width: "100%" }}
                cardColor="#fff"
                isShadow={true}
                onPressCallback={() => {
                    cardAnswerRef.current?.focus()
                }}
            >
                <CardContainer>
                    <CardTextInput
                        placeholder="輸入卡片定義"
                        placeholderTextColor="#8D8C8C"
                        ref={cardAnswerRef}
                        value={cardData?.answer}
                        onBlur={e => { updateCardsetQuestionAndAnswerBackendOnBlur(cardData?.question, e.nativeEvent.text) }}
                        onChangeText={(text) => { updateCardsetQuestionAndAnswerFrontendOnChange(cardData?.question, text) }}
                    />
                </CardContainer>
            </Card>

            <BottomButtonSection>

                <ButtomButtonContainer style={{ backgroundColor: "#B9C4C3" }}>
                    <BottomButton onPress={() => handleNavigateIndex(-1)}>
                        <Ionicons name="play-skip-back" size={24} color="white" />
                    </BottomButton>
                </ButtomButtonContainer>

                <ButtomButtonContainer style={{ backgroundColor: "#B45959" }}>
                    <BottomButton onPress={() => deleteCardsetQuestionAndAnswer()}>
                        <Feather name="trash-2" size={24} color="white" />
                    </BottomButton>
                </ButtomButtonContainer>

                <ButtomButtonContainer style={{ backgroundColor: "#66A8A6" }}>
                    <BottomButton onPress={() => handleNavigateIndex(1)}>
                        <Ionicons name="play-skip-forward" size={24} color="white" />
                    </BottomButton>
                </ButtomButtonContainer>
            </BottomButtonSection>

        </AddCardSetScreenContainer>
    );
}

const FinishedButtonContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: flex-end;
`


const FinishedButton = styled.TouchableWithoutFeedback`
    width: 200px;
`

const FinishedButtonLabel = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #565656;
`


const AddCardSetScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const ScreenTitle = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    color: #000000;
    text-align: center;
    margin: 20px 10px;
`

const CardSetNameInput = styled.TextInput`
    width: 100%;
    height: 50px;
    border-style: solid;
    border-color: #000000;
    border-bottom-width: 1.5px;
    padding: 0 10px;
`

const CardContainer = styled.View`
    width: 100%;
    height: 150px;
    padding: 20px;
`

const CardTextInput = styled.TextInput`
    font-size: 15px;
`

const BottomButtonSection = styled.View`
    width: 100%;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ButtomButtonContainer = styled.View`
    border-radius: 15px;
    padding: 10px 20px;
`

const BottomButton = styled.TouchableWithoutFeedback`
    width: 100%;
    height: 100%;   
`