import styled from "styled-components/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { RootStackParams } from "../types";
import Card from "../components/atoms/Card";
import FlipCardCarousel from "../components/organisms/FlipCardCarousel";
import { CardSetCompleteInfo } from "../types"
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";


type Props = {
    navigation: NativeStackNavigationProp<RootStackParams, "ViewCardSet">;
}

export default function ViewCardSetScreen({ navigation }: Props) {
    const [cardSetData, setCardSetData] = useState<CardSetCompleteInfo>()

    // init data using cardset_id
    useEffect(() => {
        const data: CardSetCompleteInfo = {
            id: "1",
            name: "卡片側名稱",
            questions: [
                {
                    id: "1",
                    question: "question here",
                    answer: "answer here"
                },
                {
                    id: "2",
                    question: "question here2",
                    answer: "answer here2"
                },
                {
                    id: "3",
                    question: "question here3",
                    answer: "answer here3"
                },
            ]
        }

        setCardSetData(data)

    }, [])



    return (
        <ViewCardSetScreenContainer>
            <ScreenNavigatorContainer>

                <ScreenNavigatorIconContainer>
                    <ScreenNavigatorButton onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#555555" />
                    </ScreenNavigatorButton>
                </ScreenNavigatorIconContainer>

                <ScreenTitle>
                    卡片冊
                </ScreenTitle>

                <ScreenNavigatorIconContainer>
                    <ScreenNavigatorButton>
                        <SimpleLineIcons name="options-vertical" size={24} color="#555555" />
                    </ScreenNavigatorButton>
                </ScreenNavigatorIconContainer>

            </ScreenNavigatorContainer>


            <CardCarouselContainer>

                {cardSetData &&
                    (
                        <FlipCardCarousel
                            width={Dimensions.get("screen").width - 20}
                            height={220}
                            data={cardSetData?.questions} />
                    )
                }

            </CardCarouselContainer>


            <Label>
                卡片
            </Label>

            <QuestionCardsList>

                {cardSetData?.questions.map((questions) => {
                    return (
                        <QuestionCard
                            question={questions.question}
                            answer={questions.answer}
                            key={questions.id}
                        />

                    )
                })}
            </QuestionCardsList>

        </ViewCardSetScreenContainer>
    )

}

function QuestionCard(props: {
    question: string,
    answer: string
}) {
    return (
        <Card style={{
            padding: 10,
            width: "90%",
            height: 150,
            marginBottom: 10,
            marginTop: 10,
            flexDirection: "column"
        }}>
            <>
                <QuestionCardItem style={{ borderBottomColor: "#9C9C9C", borderBottomWidth: 1, marginBottom: 10 }}>
                    <QuestionCardSmallLabel>
                        正面
                    </QuestionCardSmallLabel>
                    <QuestionCardLabelContainer>
                        <QuestionCardMediumLabel>
                            {props.question}
                        </QuestionCardMediumLabel>
                    </QuestionCardLabelContainer>
                </QuestionCardItem>

                <QuestionCardItem>
                    <QuestionCardSmallLabel>
                        反面
                    </QuestionCardSmallLabel>
                    <QuestionCardLabelContainer>
                        <QuestionCardMediumLabel>
                            {props.answer}
                        </QuestionCardMediumLabel>
                    </QuestionCardLabelContainer>
                </QuestionCardItem>
            </>
        </Card>
    )

}

const ViewCardSetScreenContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const ScreenNavigatorContainer = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

const ScreenNavigatorButton = styled.TouchableWithoutFeedback`
    width: 100%;
    height: 100%;
`

const ScreenNavigatorIconContainer = styled.View`
    width: 40px;
    height: 40px;
`

const ScreenTitle = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    color: #555555;
`

const CardCarouselContainer = styled.View`
    width: 100%;
    margin-bottom: 80px;
`

const Label = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #555555;
`

const QuestionCardsList = styled.View`
    align-items: center;
    width: 100%;
`

const QuestionCardLabelContainer = styled.View`
    flex: 1;
    justify-content: center;
`

const QuestionCardSmallLabel = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #555555;
`

const QuestionCardMediumLabel = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #555555;
`

const QuestionCardItem = styled.View`
    flex: 1
    flex-direction: row;
    justify-content: space-between;
`
