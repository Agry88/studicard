import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';

type Props = {
    label: string;
    propRef: React.RefObject<TextInput>;
    isTextAreaSecure?: boolean;
}

export default function InputBlock(props: Props) {

    const { label, propRef } = props;
    const [isTextAreaSecure, setIsTextAreaSecure] = useState(props.isTextAreaSecure ?? false)

    return (
        <Container>
            <Label>{label}</Label>
            <InputContainer>
                <Input secureTextEntry={isTextAreaSecure} ref={propRef} />
                {props.isTextAreaSecure &&
                    (isTextAreaSecure ?
                        <Entypo
                            style={styles.icon}
                            name="eye-with-line" size={24} color="black"
                            onPress={() => setIsTextAreaSecure(prev => !prev)} />
                        :
                        <AntDesign
                            style={styles.icon}
                            name="eye" size={24} color="black"
                            onPress={() => setIsTextAreaSecure(prev => !prev)}
                        />
                    )
                }
            </InputContainer>
        </Container>
    )
}

const Label = styled.Text`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    margin-left: 10px;
`

const InputContainer = styled.View`
    position: relative;
    width: 100%;
    height: 60px;
    background: rgba(192, 203, 200, 0.5);
    border-radius: 9px;
    margin-top: 10px;
`

const Input = styled.TextInput`
    padding: 0px 10px;
    width: 100%;
    height: 100%;
`

const Container = styled.View`
    margin-top: 10px;
    margin-bottom: 10px
`

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 10,
        top: 18
    }
})