import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from "react-native";
import styled from 'styled-components/native';
import StudiCardTitle from '../components/atoms/ScreenTitle';
import CarouselListWithLabel from '../components/organisms/CarouselListWithLabel';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CardSetInfo, RootStackParams } from '../types';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../types';

type Props = {
    navigation: NativeStackScreenProps<MainStackParams, "Home">
}

export default function HomeScreen({ navigation }: Props) {

    const isFocused = useIsFocused();
    const [data, setData] = useState<CardSetInfo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        if (!isFocused) return
        // fetch data
        setIsLoading(true)

        const fetchData = async () => {
            const token = await AsyncStorage.getItem("@token")
            const res = await fetch(`${BACKEND_URL}/api/cardset/getbysearch/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                }
            })

            if (res.status !== 200) {
                showMessage({
                    type: "danger",
                    message: "取得卡片冊失敗,將重新刷新頁面",
                })

                const errorMessage = await res.json()

                console.warn(errorMessage);

                console.log("Refreshing page...");

                navigation.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            }

            const data = await res.json()
            setData(data)
            setIsLoading(false)
        }

        fetchData()

    }, [isFocused])


    return (
        <HomeScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <CardsetsSection>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <>
                    <CarouselListWithLabel
                        data={data}
                        height={180}
                        label={"最近"}
                        checkMoreCallBack={() => {
                            console.log("check more");
                        }}
                    />
                    <CarouselListWithLabel
                        data={data}
                        height={150}
                        label={"卡片冊"}
                        checkMoreCallBack={() => console.log("check more")}
                    />
                    <CarouselListWithLabel
                        data={data}
                        height={150}
                        label={"班級"}
                        checkMoreCallBack={() => console.log("check more")}
                    />
                </>
                }

            </CardsetsSection>
        </HomeScreenContainer>
    );
}

const HomeScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const CardsetsSection = styled.ScrollView`
    flex: 1;
`