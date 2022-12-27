import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    data: string[]
    onPress: () => void
}

export default function ProfileCardList({ data, onPress }: Props) {
    return (
        <ProfileItemContainer>
            {data?.map((item, index) => (
                <ProfileItem>
                    <ProfileItemLabel>
                        {item}
                    </ProfileItemLabel>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
                </ProfileItem>
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
`

const ProfileItemLabel = styled.Text`
    font-size: 20px;
`
