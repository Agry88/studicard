import { View, Modal, TouchableWithoutFeedback, Dimensions } from "react-native";
import styled from 'styled-components/native';
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible";

type Props = {
    isVisible: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    title: string;
}

export default function CustomModal(props: Props) {

    const { isVisible, closeModal, children, title } = props;
    const modalHeight = Dimensions.get('window').height * 45 / 100;
    const isKeyboardVisible = useKeyboardVisible()

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => closeModal()}
            animationType={"slide"}
        >
            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <OutSideModal />
            </TouchableWithoutFeedback>

            <ModalContainer style={{
                marginTop: modalHeight,
                top: isVisible && isKeyboardVisible ? "-40%" : "0%",
            }}
            >
                <TouchableWithoutFeedback
                onPress={() => closeModal()}
                >
                    <ModalContent>
                        <ModalTitle>{title}</ModalTitle>

                        {children}

                    </ModalContent>
                </TouchableWithoutFeedback>
            </ModalContainer>
        </Modal>
    );
}

const OutSideModal = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
`
const ModalContainer = styled.View`
    flex: 1;
    margin-left: 1%;
    margin-right: 1%;
    background-color: #fff;
    border-radius: 7px!important;
`

const ModalContent = styled.View`
    flex:1;
    padding: 20px 20px;
`

const ModalTitle = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #2C6369;
`