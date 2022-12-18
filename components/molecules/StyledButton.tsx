import StyledButtonContainer from "../atoms/StyledButtonContainer";
import StyledText from './../atoms/StyledText';
import { TouchableHighlight } from 'react-native';
import shadeColor from "../../utils/shadeColor";

type Prop = {
    // Hex
    color?: `#${string}`;
    text: string;
    cb: () => void;
}

export default function StyledButton({ color, text, cb }: Prop) {
    const buttonContainerColor = color ? color : "#2C6369";
    const onPressColor = shadeColor(buttonContainerColor, 20);
    return (
        <StyledButtonContainer color={buttonContainerColor}>
            <TouchableHighlight
                style={{ borderRadius: 6 }}
                underlayColor={onPressColor}
                onPress={cb}
            >
                <StyledText text={text} />
            </TouchableHighlight>
        </StyledButtonContainer>
    );
}