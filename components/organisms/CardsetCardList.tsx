import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from "styled-components/native"
import { CardSetInfo, RootStackParams } from "../../types";
import CardsetCard from '../molecules/CardsetCard';
import { useNavigation } from '@react-navigation/native';

type Prop = {
    data: CardSetInfo[];
    handleReachEnd: () => void;
}

export default function CardserCardList({ data, handleReachEnd }: Prop) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    
    const handleSearchCardWithId = (id: string) => {
        navigation.navigate("ViewCardSet", { cardSetId:id })
    }

    const isItemCardSetInfo = (item: unknown): item is CardSetInfo => {
        if (typeof item === "object" && item !== null) {
            const { id, title, questionLength, createrName } = item as CardSetInfo;
            if (typeof id === "string" && typeof title === "string" && typeof questionLength === "number" && typeof createrName === "string") {
                return true;
            }
        }
        return false;
    }
    
    return (
        <CardsContainer>
            <ScrollList
                data={data}
                initialNumToRender={10}
                onEndReached={handleReachEnd}
                renderItem={({ item }) => {
                    if (!isItemCardSetInfo(item)) return null
                    return (
                        <CardContainer>
                            <CardsetCard
                                data={item}
                                onPressCallback={() => handleSearchCardWithId(item.id)}
                            />
                        </CardContainer>
                    )
                }}
            />
        </CardsContainer>
    )
}

const ScrollList = styled.FlatList`
    width: 100%;
    height: 100%;
`

const CardsContainer = styled.View`
    align-items: center;
`

const CardContainer = styled.View`
    align-items: center;
    width: 100%;
    height: 130px;
    margin: 10px 0;
`
