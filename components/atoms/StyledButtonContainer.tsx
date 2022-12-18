import * as React from 'react';
import styled from 'styled-components/native';


export default function StyledButtonContainer({ children }: { children: JSX.Element }) {
    return ( 
        <ButtonContainer>
            {children}
        </ButtonContainer>
     );
}

const ButtonContainer = styled.View`
    background-color: #2C6369;
    border-radius: 6px;
`