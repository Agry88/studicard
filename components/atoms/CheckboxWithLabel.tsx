import { View, Text } from "react-native";
import Checkbox from 'expo-checkbox';
import styled from 'styled-components/native';

type Props = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
}

export default function CheckBoxWithLabel({ label, value, onValueChange }: Props) {
    return (
        <Container>
            <StyledChechbox
                value={value}
                onValueChange={onValueChange}
                color={value ? '#4630EB' : undefined}
            />
            <Label>{label}</Label>
        </Container>
    );
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const Label = styled.Text`
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
`

const StyledChechbox = styled(Checkbox)`
    display: inline-block;
`