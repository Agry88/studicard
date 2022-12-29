import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    data: {
        text: string,
        onPress: () => void
    }[]
}

export default function ProfileCardList({ data }: Props) {
    return (
        <ProfileItemContainer>
            {data?.map((item, index) => (
                <ProfileItemButton key={index} onPress={() => item.onPress()}>
                    <ProfileItem>
                        <ProfileItemLabel>
                            {item.text}
                        </ProfileItemLabel>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
                    </ProfileItem>
                </ProfileItemButton>
            ))}
        </ProfileItemContainer>
    );
}

const ProfileItemContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const ProfileItem = styled.View`
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
`

const ProfileItemButton = styled.TouchableWithoutFeedback`
    
`

const ProfileItemLabel = styled.Text`
    font-size: 20px;
`
