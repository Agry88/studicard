import { TextInput } from "react-native"
import Card from "../atoms/Card"
import styled from "styled-components/native"

type Props = {
    fontStyle?: object
    height?: number
    textString: string
}

export default function FlipCard({ fontStyle, textString, height }: Props) {

    return (

        <CardContainer>
            <Card
                style={{
                    width: "95%",
                    height: height ?? 200,
                    ...(fontStyle ? fontStyle : {}),
                    justifyContent: "center",
                    alignItems: "center",
                }}
                isShadow
            >
                <Text>{textString}</Text>
            </Card>
        </CardContainer>

    )
}

const CardContainer = styled.View`
    flex: 1;
    width: 300px;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text`
    font-size: 20px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: #555555;
`
