import { useRef, useState } from "react";
import { TextInput } from "react-native";
import styled from 'styled-components/native';
import MyCustomInputBlock1 from '../molecules/InputBlock';
import CustomModal from '../molecules/CustomModal';
import StyledButton from '../molecules/StyledButton';
import CheckBoxWithLabel from '../atoms/CheckboxWithLabel';

type Props = {
    isVisible: boolean,
    closeModal: () => void,
    signUp: (account_name: string,password: string, email: string) => void,
}

export default function SignUpModal(props: Props) {

    const { isVisible, closeModal } = props;

    const nickNameRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)

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
                        propRef={nickNameRef}
                    />

                    <MyCustomInputBlock1
                        label="Email"
                        propRef={emailRef}
                    />

                    <MyCustomInputBlock1
                        label="Password"
                        propRef={passwordRef}
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

                    <StyledButton text="Create Account" cb={() => console.log("create")} />

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