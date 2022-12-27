import { Text } from "react-native"
import Card from "../atoms/Card"
import styled from "styled-components/native"


export default function FlipCard() {


    return (

        <CardContainer>
            <Card
                style={{ width: "95%", height: 200 }}
                isShadow
            >
                <Text>
                    123
                </Text>
            </Card>
        </CardContainer>

    )
}

const CardContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
