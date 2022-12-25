import styled from "styled-components/native";
import Card from '../atoms/Card';
import { CardInfo } from "../../types"

type Props = {
    data: CardInfo;
    onPressCallback: () => void;
}

export default function CarouselCard(props: Props) {
    const { data, onPressCallback } = props;
    return (
        <Card cardColor="#fff" onPressCallback={onPressCallback}>
            <CardContainer>
                <TitleAndQuestionLengthContainer>
                    <Title>
                        {data.title}
                    </Title>
                    <QuestionLength>
                        {data.questionLength}個詞語
                    </QuestionLength>
                </TitleAndQuestionLengthContainer>

                <CreaterNameContainer>
                    <CreaterName>
                        {data.createrName}
                    </CreaterName>
                </CreaterNameContainer>

            </CardContainer>
        </Card>
    );
}

const CardContainer = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 10px;
`

const TitleAndQuestionLengthContainer = styled.View`

`

const CreaterNameContainer = styled.View`

`


const Title = styled.Text`
    font-size: 20px;
    font-weight: 700;
`

const QuestionLength = styled.Text`
    font-size: 15px;
    font-weight: 200;
`

const CreaterName = styled.Text`
    font-size: 15px;
    font-weight: 200;
`