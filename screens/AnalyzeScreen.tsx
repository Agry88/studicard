import { Text, StyleSheet, Dimensions, View } from "react-native";
import { CardSetFocusInfo } from "../types";
import styled from "styled-components/native";
import StudiCardTitle from "../components/atoms/ScreenTitle";
import Card from "../components/atoms/Card";
import MyPieChart from "../components/atoms/MyPieChart";
import { useEffect, useState } from "react";

export default function AnalyzeScreen() {

    const [chartData, setChartData] = useState<CardSetFocusInfo[]>([])

    // get ChartData From AsyncStorage
    useEffect(() => {
        const data = [
            {
                id: "1",
                name: "測試集1",
                focusSeconds: 100
            },
            {
                id: "2",
                name: "測試集2",
                focusSeconds: 200
            },
            {
                id: "3",
                name: "測試集3",
                focusSeconds: 300
            },
            {
                id: "4",
                name: "測試集4",
                focusSeconds: 400
            },
        ]

        setChartData(data)

    }, [])


    return (
        <AnalyzeScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <CardLabel>
                卡片學習分佈
            </CardLabel>
            <CardContainer>
                <Card style={styles.Card} cardColor="#fff" isShadow={true}>
                    <MyPieChart
                        data={chartData}
                        height={250}
                        width={Dimensions.get("window").width - 40}
                    />
                </Card>
            </CardContainer>
            <CardLabel>
                數據統計
            </CardLabel>
            <CardContainer>
                <Card style={{ width: "100%", padding: 10 }} cardColor="#fff" isShadow={true}>
                    <AnalyzeContainer>
                        <AnalyzeItemList>
                            <AnalyzeItem label="今日學習時長" hour={2} min={30} />
                            <AnalyzeItem label="今日學習時長" hour={2} min={30} />
                        </AnalyzeItemList>
                        <AnalyzeItemList>
                            <AnalyzeItem label="今日學習時長" hour={2} min={30} />
                            <AnalyzeItem label="今日學習時長" isLearningTime learningTimes={2} />
                        </AnalyzeItemList>
                    </AnalyzeContainer>
                </Card>
            </CardContainer>
        </AnalyzeScreenContainer>
    );
}

const styles = StyleSheet.create({
    Card: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
})

const AnalyzeScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const CardLabel = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CardContainer = styled.View`
    width: 100%;
    height: 250px;
    align-items: center;
    margin-bottom: 20px;
`;

const AnalyzeContainer = styled.View`
    flex: 1;
    flex-direction: column;
`

const AnalyzeItemList = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0px;
`

function AnalyzeItem({ label, hour, min, isLearningTime, learningTimes }: {
    label: string,
    hour?: number,
    min?: number,
    isLearningTime?: boolean,
    learningTimes?: number
}) {

    return (
        <AnalyzeItemContainer>
            <AnalyzeItemLabel>
                測試
            </AnalyzeItemLabel>
            {isLearningTime ? (
                <AnalyzeItemValueContainer>
                    <AnalyzeItemBlackText>
                        {learningTimes}
                    </AnalyzeItemBlackText>
                    <AnalyzeItemBlueText>
                        次
                    </AnalyzeItemBlueText>
                </AnalyzeItemValueContainer>
            ) : (
                <AnalyzeItemValueContainer>
                    <AnalyzeItemBlackText>
                        {hour}
                    </AnalyzeItemBlackText>
                    <AnalyzeItemBlueText>
                        小時
                    </AnalyzeItemBlueText>
                    <AnalyzeItemBlackText>
                        {min}
                    </AnalyzeItemBlackText>
                    <AnalyzeItemBlueText>
                        分鐘
                    </AnalyzeItemBlueText>
                </AnalyzeItemValueContainer>
            )
            }
        </AnalyzeItemContainer>
    )
}

const AnalyzeItemContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AnalyzeItemLabel = styled.Text`
    font-size: 20px;
    font-weight: bold;
`

const AnalyzeItemValueContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const AnalyzeItemBlueText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #40807D;
`

const AnalyzeItemBlackText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #444444;
    margin: 0px 5px;
`