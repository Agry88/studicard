import * as React from 'react';
import styled from 'styled-components/native';

type Prop = {
    // Hex
    color?: `#${string}`;
    children: JSX.Element;
}

export default function StyledButtonContainer({ color ,children }: Prop) {
    return ( 
        <ButtonContainer style={{ backgroundColor: color }}>
            {children}
        </ButtonContainer>
     );
}

const ButtonContainer = styled.View`
    border-radius: 6px;
`