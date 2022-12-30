import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import { CardSetInfo, RootStackParams } from "../../types"
import CardsetCard from '../molecules/CardsetCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = {
    data: CardSetInfo[];
    height?: number;
}

export default function CarouselList(props: Props) {
    const { data } = props;
    const height = props.height ?? 200;
    const width = Dimensions.get('window').width;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams,"MainStack">>()

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
                        <CardsetCard data={data[index]} onPressCallback={() => {
                            const cardSetId = data[index].id.toString()
                            console.log("pressed cardset card, id: ",cardSetId)
                            navigation.navigate("ViewCardSet", { cardSetId })
                        }} />
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