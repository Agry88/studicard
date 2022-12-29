import styled from "styled-components/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MainStackParams, RootStackParams } from "../types";
import Card from "../components/atoms/Card";
import FlipCardCarousel from "../components/organisms/FlipCardCarousel";
import { CardSetCompleteInfo } from "../types"
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message"


type Props = {
    navigation: NativeStackNavigationProp<RootStackParams, "ViewCardSet">;
    route: RouteProp<RootStackParams, "ViewCardSet">;
}

export default function ViewCardSetScreen({ route, navigation }: Props) {
    const [cardSetData, setCardSetData] = useState<CardSetCompleteInfo>()
    const [menuVisible, setMenuVisible] = useState(false);
    const mainNavigation = useNavigation<NativeStackNavigationProp<MainStackParams>>()

    const navigateToEditCardSet = () => {
        if (!cardSetData?.id) return
        setMenuVisible(false)
        mainNavigation.navigate("AddCardSet", {
            cardSetId: cardSetData.id
        })
    }

    const handleDeleteCardSet = () => {
        if (!cardSetData?.id) return

        // Call api to delete the card set

        setMenuVisible(false)
        mainNavigation.navigate("Home")
    }

    // init data using cardset_id
    useEffect(() => {
        const cardsetId = route.params.cardSetId

        const fetchCardSetData = async () => {
            try {
                const token = await AsyncStorage.getItem("@token")
                const res = await fetch(`${BACKEND_URL}/api/cardset/getcard/${cardsetId}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                })

                if (res.status !== 200) {
                    showMessage({
                        type: "danger",
                        message: "取得資料失敗"
                    })
                    navigation.goBack()
                }

                const data = await res.json()

                console.log(data);

                setCardSetData(data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchCardSetData()
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
                    {cardSetData?.isEditable && (
                        <ScreenNavigatorButton onPress={() => setMenuVisible(true)}>
                            <SimpleLineIcons name="options-vertical" size={24} color="#555555">
                                <Menu
                                    visible={menuVisible}
                                    onRequestClose={() => setMenuVisible(false)}
                                >
                                    <MenuItem onPress={() => navigateToEditCardSet()}>編輯卡片集</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={() => handleDeleteCardSet()}>刪除卡片集</MenuItem>
                                </Menu>
                            </SimpleLineIcons>
                        </ScreenNavigatorButton>
                    )}
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
