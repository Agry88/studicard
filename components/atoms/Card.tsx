import { StyleSheet } from 'react-native';
import styled from "styled-components/native";
import shadeColor from '../../utils/shadeColor';

type Props = {
    onPressCallback?: () => void;
    children: React.ReactNode;
    cardColor?: `#${string}`;
    style?: object;
    isShadow?: boolean;
}

export default function Card(props: Props) {
    const { onPressCallback, children } = props;
    const isShadow = props.isShadow ?? false;
    const cardColor = props.cardColor ?? "#fff";
    return (
        <CardBorder
            style={{
                backgroundColor: cardColor,
                ...(isShadow ? styles.CardShadow : {}),
                ...props.style
            }}
        >
            {onPressCallback === undefined ? children :
                <OnPressConatiner
                    onPress={onPressCallback}
                    underlayColor={shadeColor(cardColor, 100)}
                >
                    {children}
                </OnPressConatiner>
            }
        </CardBorder>
    );
}

const styles = StyleSheet.create({
    CardShadow: {
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowColor: 'grey',
        shadowOffset: { height: 10, width: 10 },
    }
})

const CardBorder = styled.View`
    border-radius: 10px;
    width: 80%;
    height: 100%;
`

const OnPressConatiner = styled.TouchableHighlight`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`


