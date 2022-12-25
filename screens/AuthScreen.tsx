import * as React from 'react';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from "../types";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import StyledButton from './../components/molecules/StyledButton';
import LoginModal from './../components/organisms/LoginModal';
import SignUpModal from './../components/organisms/SignUpModal';

export default function AuthScreen() {
    
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [isLoginModalVisable, setIsLoginModalVisable] = useState(false)
    const [isSignUpModalVisable, setIsSignUpModalVisable] = useState(false)

    const handleLogin = () => {

        // backend auth logic here

        // close modal
        setIsLoginModalVisable(false)

        // navigate to main stack
        navigation.navigate('MainStack')
    }

    const handleSignUp = () => {

        // backend auth logic here to create user

        // sign up for the user

        // close modal
        setIsSignUpModalVisable(false)
        
        // navigate to main stack
        navigation.navigate('MainStack')
    }

    return (
        <AuthScreenContainer>

            <TitleContainer>
                <TitleImage
                    source={require('../assets/images/studicard_icon.png')}
                />
                <TitleText>StudiCard</TitleText>
            </TitleContainer>

            <ButtonsContainer>

                <StyledButton text={"Login"} cb={() => setIsLoginModalVisable(true)} />

                <StyledButton text={"Sign up"} cb={() => setIsSignUpModalVisable(true)} />


            </ButtonsContainer>
            <LoginModal
                isVisible={isLoginModalVisable}
                closeModal={() => setIsLoginModalVisable(prev => !prev)}
                login={handleLogin}
            />

            <SignUpModal
                isVisible={isSignUpModalVisable}
                closeModal={() => setIsSignUpModalVisable(prev => !prev)}
                signUp={handleSignUp}
            />
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
  position: relative;
  min-height: 60%;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleText = styled.Text`
    potition: absolute;
    top: -10px
    font-family: 'Arial';
    font-style: italic;
    font-weight: 700;
    font-size: 37px;
    line-height: 43px;
    color: #fff;
`

const TitleImage = styled.Image`
    position: absolute;
    width: 250px;
    height: 250px;
    resizeMode: contain;
`

const ButtonsContainer = styled.View`
    width: 60%;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`