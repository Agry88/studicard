import { useState } from "react";
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyCustomInputBlock1 from './../molecules/InputBlock';
import CustomModal from './../molecules/CustomModal';
import StyledButton from './../molecules/StyledButton';
import CheckBoxWithLabel from './../atoms/CheckboxWithLabel';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from "@env";
import { showMessage } from "react-native-flash-message";
import { RootStackParams } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    isVisible: boolean,
    closeModal: () => void
}

export default function LoginModal(props: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const { isVisible, closeModal } = props;

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)

    const signIn = async () => {
        // sign up for the user
        const signInRes = await fetch(`${BACKEND_URL}/api/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                email
            }),
        })

        if (signInRes.status !== 200) {
            showMessage({
                type: "warning",
                message: "登入失敗,請重新再試"
            })
            const message = await signInRes.json()
            console.warn(message);
            return
        }

        const signResJson: {
            message: string,
            token: string
        } = await signInRes.json()

        await AsyncStorage.setItem("@token", signResJson.token)

        // close modal
        closeModal()

        // navigate to main stack
        navigation.navigate("MainStack")

        showMessage({
            type: "success",
            message: "登入成功"
        })
    }

    return (

        <CustomModal
            isVisible={isVisible}
            closeModal={closeModal}
            title="Login"
        >

            <InputsContainer>

                <MyCustomInputBlock1
                    label="Email"
                    value={email}
                    onChange={setEmail}
                />

                <MyCustomInputBlock1
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    isTextAreaSecure={true}
                />

            </InputsContainer>

            <RememberMeContainer>
                <CheckBoxWithLabel
                    label="Remember me"
                    value={isRememberMeChecked}
                    onValueChange={setIsRememberMeChecked}
                />
            </RememberMeContainer>

            <LoginButton text="Login" cb={signIn} />

        </CustomModal>

    );
}

const InputsContainer = styled.View`
    margin-top: 30px;
`

const RememberMeContainer = styled.View`
    align-self: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
`

const LoginButton = styled(StyledButton)`
    max-width: 30%;
`