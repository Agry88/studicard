import { TouchableHighlight } from 'react-native';
import styled from "styled-components/native";
import shadeColor from '../../utils/shadeColor';

type Props = {
    onPressCallback: () => void;
    children: React.ReactNode;
    cardColor: `#${string}`;
    style?: object;
}

export default function Card(props: Props) {
    const { onPressCallback, children, cardColor } = props;
    return (
        <CardBorder
        style={{ backgroundColor: cardColor, ...props.style }}
        >
            <OnPressConatiner
            onPress={onPressCallback}
            underlayColor={shadeColor(cardColor, 100)}
            >
                {children}
            </OnPressConatiner>
        </CardBorder>
    );
}

const CardBorder = styled.View`
    border-radius: 10px;
    border: 1px solid #000;
    width: 80%;
    height: 100%;
`

const OnPressConatiner = styled.TouchableHighlight`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`


