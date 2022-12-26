import { FlatList } from 'react-native';
import styled from "styled-components/native"
import { CardSetInfo } from "../../types";
import CardsetCard from '../molecules/CardsetCard';
import generateUUID from '../../utils/generateUUID';

type Prop = {
    data: CardSetInfo[];
    handleReachEnd: () => void;
}

export default function CardserCardList({ data, handleReachEnd }: Prop) {

    const handleSearchCardWithId = (id: string) => {
        // Get 
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
