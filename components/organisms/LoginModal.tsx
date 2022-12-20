import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import styled from 'styled-components/native';
import MyCustomInputBlock1 from './../molecules/InputBlock';
import CustomModal from './../molecules/CustomModal';
import StyledButton from './../molecules/StyledButton';
import CheckBoxWithLabel from './../atoms/CheckboxWithLabel';

type Props = {
    isVisible: boolean,
    closeModal: () => void
}

export default function LoginModal(props: Props) {

    const { isVisible, closeModal } = props;

    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)

    return (

        <CustomModal
            isVisible={isVisible}
            closeModal={closeModal}
            title="Login"
        >

            <InputsContainer>

                <MyCustomInputBlock1
                    label="Email"
                    propRef={emailRef}
                />

                <MyCustomInputBlock1
                    label="Password"
                    propRef={passwordRef}
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

            <LoginButton text="Login" cb={() => console.log("Login")} />

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