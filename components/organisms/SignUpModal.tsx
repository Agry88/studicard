import { useState } from "react";
import styled from 'styled-components/native';
import MyCustomInputBlock1 from '../molecules/InputBlock';
import CustomModal from '../molecules/CustomModal';
import StyledButton from '../molecules/StyledButton';
import CheckBoxWithLabel from '../atoms/CheckboxWithLabel';
import { BACKEND_URL } from '@env'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from "../../types";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    isVisible: boolean,
    closeModal: () => void,
}

export default function SignUpModal(props: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const { isVisible, closeModal } = props;

    const [nickName, setNickName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)

    const handleSignUp = async () => {

        if (nickName === "" || email === "" || password === "") {
            showMessage({
                type: "warning",
                message: "有欄位為空值",
                description: "請確認每個欄位都有被輸入"
            })
            return;
        }

        // backend auth logic here to create user
        const signUpRes = await fetch(`${BACKEND_URL}/api/account/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account_name: nickName,
                password,
                email
            }),
        })

        if (signUpRes.status !== 200) {
            const errorMessage = await signUpRes.text()
            showMessage({
                type: "warning",
                message: "註冊失敗",
                description: errorMessage
            })

            return
        }

        // sign up for the user
        const signInRes = await fetch(`${BACKEND_URL}/api/account/login`,{
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
        <>
            <CustomModal
                isVisible={isVisible}
                closeModal={closeModal}
                title="SignUp"
            >

                <InputsContainer>

                    <MyCustomInputBlock1
                        label="Nickname"
                        value={nickName}
                        onChange={setNickName}
                    />

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

                    <PolicyContainer>
                        <CheckBoxWithLabel
                            label="I agree to the Terms and Conditions and the Privacy Policy"
                            value={isRememberMeChecked}
                            onValueChange={setIsRememberMeChecked}
                            labelSize={12}
                        />
                    </PolicyContainer>

                    <StyledButton text="Create Account" cb={() => {
                        handleSignUp()
                    }}
                    />

                </InputsContainer>

            </CustomModal>
        </>
    );
}

const InputsContainer = styled.KeyboardAvoidingView`
    flex: 1;
    gap: 20px;
    margin-top: 10px;
`

const PolicyContainer = styled.View`
    align-self: flex-start;
    margin-bottom: 10px;
`