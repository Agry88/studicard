import styled from "styled-components/native"
import CarouselList from "./CarouselList"
import { CardSetInfo } from "../../types";

type Props = {
    data: CardSetInfo[];
    label: string;
    height?: number;
    checkMoreCallBack?: () => void;
}

export default function CarouselListWithLabel(props: Props) {

    return (
        <Container>
            <LabelContainer>
                <Label>
                    {props.label}
                </Label>

                {props.checkMoreCallBack &&
                    <CheckMoreButton
                        onPress={props.checkMoreCallBack}
                    >
                        <CheckMoreButtonText>
                            查看更多
                        </CheckMoreButtonText>
                    </CheckMoreButton>

                }

            </LabelContainer>
            <CarouselList data={props.data} height={props.height} />
        </Container>


    )
}

const Container = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 10px 0px;
`
const LabelContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const Label = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
`

const CheckMoreButton = styled.TouchableWithoutFeedback`

`

const CheckMoreButtonText = styled.Text`
    font-size: 14px;
    line-height: 24px;
    color: #2C6369;
`