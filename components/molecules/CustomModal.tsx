import { View, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import styled from 'styled-components/native';

type Props = {
    isVisible: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    title: string;
}

export default function CustomModal(props: Props) {

    const { isVisible, closeModal , children , title } = props;

    return (
        <View>
            <Modal
                visible={isVisible}
                transparent={true}
                onRequestClose={() => closeModal()}
                animationType={"slide"}
            >
                <TouchableWithoutFeedback onPress={() => closeModal()}>
                    <OutSideModal />
                </TouchableWithoutFeedback>

                <ModalContainer>
                    <ModalContent>
                        <ModalTitle>{title}</ModalTitle>

                        {children}

                    </ModalContent>
                </ModalContainer>
            </Modal>
        </View>
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
    margin-top: 45vh;
    margin-left: 1%;
    margin-right: 1%;
    background-color: #fff;
    border-radius: 7px!important;
`

const ModalContent = styled.View`
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