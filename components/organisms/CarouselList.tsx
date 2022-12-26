import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import { CardSetInfo } from "../../types"
import CardsetCard from '../molecules/CardsetCard';


type Props = {
    data: CardSetInfo[];
    height?: number;
}

export default function CarouselList(props: Props) {
    const { data } = props;
    const height = props.height ?? 200;
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Carousel
                loop
                width={width}
                height={height}
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (
                    <CardContainer>
                        <CardsetCard data={data[index]} onPressCallback={() => console.log("ji") } />
                    </CardContainer>
                )}
            />
        </View>
    );
}

const CardContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`