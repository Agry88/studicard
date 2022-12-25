import styled from "styled-components/native";

export default function StudiCardTitle({ text }: { text: string }) {
    return (
        <Title>
            {text}
        </Title>
    )
}

const Title = styled.Text`
    font-family: 'Arial';
    font-style: italic;
    font-weight: 700;
    font-size: 35px;
    line-height: 32px;
    color: #66A8A6;
    align-self: center;
`
