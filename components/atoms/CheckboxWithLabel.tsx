import { View, Text } from "react-native";
import Checkbox from 'expo-checkbox';
import styled from 'styled-components/native';

type Props = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    labelSize?: number;
}

export default function CheckBoxWithLabel({ label, value, onValueChange , labelSize }: Props) {
    return (
        <Container>
            <StyledChechbox
                value={value}
                onValueChange={onValueChange}
                color={value ? '#4630EB' : undefined}
            />
            <Label style={{ fontSize:labelSize ?? 16 }}>{label}</Label>
        </Container>
    );
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Label = styled.Text`
    display: inline-block;
    font-weight: 700;
    margin-left: 10px;
`

const StyledChechbox = styled(Checkbox)`
    display: inline-block;
`