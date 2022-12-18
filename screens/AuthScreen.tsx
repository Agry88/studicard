import * as React from 'react';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from "../types";
import styled from 'styled-components/native';
import StyledButton from './../components/molecules/StyledButton';
import LoginModal from './../components/organisms/LoginModal';

type Props = NativeStackScreenProps<AuthStackParams, "Auth">;

export default function AuthScreen({ navigation }: Props) {

    const [isLoginModalVisable, setIsLoginModalVisable] = useState(false)

    return (
        <AuthScreenContainer>

            <TitleContainer>
                <TitleText>StudiCard</TitleText>
            </TitleContainer>

            <ButtonsContainer>

                <StyledButton text={"Login"} cb={() => setIsLoginModalVisable(true)} />

                <StyledButton text={"Sign up"} cb={() => console.log("Login")} />

                <LoginModal isVisible={isLoginModalVisable} 
                closeModal={() => setIsLoginModalVisable(prev => !prev)}/>

            </ButtonsContainer>
        </AuthScreenContainer>
    )
}

const AuthScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #DBEFEE;
`

const TitleContainer = styled.View`
  min-height: 60%;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleText = styled.Text`
    font-family: 'Arial';
    font-style: italic;
    font-weight: 700;
    font-size: 37px;
    line-height: 43px;
    color: #fff;
`

const ButtonsContainer = styled.View`
    width: 60%;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`