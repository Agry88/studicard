import * as React from 'react';
import { ScrollView } from "react-native";
import styled from 'styled-components/native';
import StudiCardTitle from '../components/atoms/ScreenTitle';
import CarouselListWithLabel from '../components/organisms/CarouselListWithLabel';

const data = [
    {
        title: "卡片及標題1",
        questionLength: 10,
        createrName: "創作者1"
    },
    {
        title: "卡片及標題2",
        questionLength: 10,
        createrName: "創作者2"
    },
    {
        title: "卡片及標題3",
        questionLength: 10,
        createrName: "創作者3"
    },
]

export default function HomeScreen() {

    return (
        <HomeScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <CardsetsSection>
                <CarouselListWithLabel
                    data={data}
                    height={180}
                    label={"最近"}
                    checkMoreCallBack={() => console.log("check more")}
                />
                <CarouselListWithLabel
                    data={data}
                    height={150}
                    label={"卡片冊"}
                    checkMoreCallBack={() => console.log("check more")}
                />
                <CarouselListWithLabel
                    data={data}
                    height={150}
                    label={"班級"}
                    checkMoreCallBack={() => console.log("check more")}
                />
            </CardsetsSection>
        </HomeScreenContainer>
    );
}

const HomeScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const CardsetsSection = styled.ScrollView`
    flex: 1;
`