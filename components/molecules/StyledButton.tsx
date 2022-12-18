import StyledButtonContainer from "../atoms/StyledButtonContainer";
import StyledText from './../atoms/StyledText';
import { TouchableHighlight } from 'react-native';

type Prop = {
    text: string;
    cb: () => void;
}

export default function StyledButton({ text , cb }: Prop) {
    return (
        <StyledButtonContainer>
            <TouchableHighlight onPress={cb}>
                <StyledText text={text} />
            </TouchableHighlight>
        </StyledButtonContainer>
    );
}