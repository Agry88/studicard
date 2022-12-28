import React from "react";
import FlipCard from "../molecules/FlipCard";
import FlipComponent from "../molecules/flip-component";
import Carousel from "react-native-reanimated-carousel";
import { CardSetQuestionInfo } from "../../types"

type Props = {
    width: number,
    height: number,
    data: CardSetQuestionInfo[],
}

export default function FlipCardCarousel(props: Props) {

    const { width, height, data } = props;

    return (
        <Carousel
            loop
            width={width}
            height={height}
            data={data}
            scrollAnimationDuration={1000}
            renderItem={({ index }: { index: number }) => (
                <FlipComponent
                    frontComponent={<FlipCard textString={data[index].question} height={height - 40} />}
                    backComponent={<FlipCard textString={data[index].answer} height={height - 40} />}
                />
            )}
        />
    )
} 