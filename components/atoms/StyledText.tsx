import * as React from 'react';
import styled from 'styled-components/native';

export default function StyledText({ text }: { text: string }) {
    return ( 
        <ButtonText>
            {text}
        </ButtonText>
     );
}

const ButtonText = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    padding: 10px 25px;
`