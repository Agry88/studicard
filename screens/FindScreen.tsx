import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import styled from 'styled-components/native';
import StudiCardTitle from '../components/atoms/ScreenTitle';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardSetInfo } from "../types";
import CardserCardList from '../components/organisms/CardsetCardList';
import { BACKEND_URL } from '@env';
import { showMessage } from "react-native-flash-message"

export default function FindScreen() {

    const searchTextInputRef = useRef<TextInput>(null)
    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<CardSetInfo[]>([])
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setpage] = useState(0)

    // Get search history
    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const history = await AsyncStorage.getItem('@search_history')
                const c = history ? JSON.parse(history) : []
                setSearchHistory(c)
            } catch (e) {
                console.log(e);
            }
        }
        getSearchHistory()
    }, [])

    const handleSearch = async () => {
        try {
            if (search === "") return
            // set loading state
            setIsLoading(true)

            // clear side effect
            setpage(0)
            setSearchResult([])

            // Set history
            const history = await AsyncStorage.getItem('@search_history')
            const c = history ? JSON.parse(history) : []
            if (!(history && c.includes(search))) {
                c.push(search)
            }
            await AsyncStorage.setItem('@search_history', JSON.stringify(c));
            setSearchHistory(prev => [...prev, search])

            // Search
            await getCardInfoBySearch(0)
        } catch (e) {
            console.log(e);
        }
    }

    const handleRemoveSearchHistory = async (history: string) => {
        try {
            const c = searchHistory?.filter(h => h !== history)
            await AsyncStorage.setItem('@search_history', JSON.stringify(c));
            setSearchHistory(prev => prev?.filter(h => h !== history))
        } catch (e) {
            console.log(e);
        }
    }

    const handleHistoryTextToTextInput = (history: string) => {
        setSearch(history)
        searchTextInputRef.current?.focus()
        searchTextInputRef.current?.blur()
    }

    const getCardInfoBySearch = async (_page: number) => {
        const newpage = _page + 1
        setpage(newpage)
        try {
            // call api
            console.log("search url");
            console.log(`${BACKEND_URL}/api/cardset/getbysearch/${newpage}${search === "" ? "" : `/${search}`}`);
            
            const token = await AsyncStorage.getItem("@token")
            const res = await fetch(`${BACKEND_URL}/api/cardset/getbysearch/${newpage}${search === "" ? "" : `/${search}`}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${token}`,
                }
            })

            if (res.status !== 200) {
                const message = await res.json();
                console.warn(res.status);
                console.warn(message);
                showMessage({
                    type: "danger",
                    message: "取得卡片集失敗"
                })
                setpage(newpage - 1)
                return
            }



            const data: CardSetInfo[] = await res.json()
            console.log("search successful");
            console.log(data);

            if (data.length === 0) {
                showMessage({
                    type: "info",
                    message: "沒有更多卡片集了,該搜尋結果已經到底了"
                })
                setpage(newpage - 1)
            }


            setSearchResult(prev => [...prev, ...data])
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <FindScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <InputContainer>
                <Input value={search} ref={searchTextInputRef} onBlur={() => handleSearch()} onChangeText={text => setSearch(text)} />
                <TouchableWithoutFeedback onPress={() => handleSearch()}>
                    <Entypo name="magnifying-glass" style={styles.icon} size={24} color="black" />
                </TouchableWithoutFeedback>
            </InputContainer>

            {searchResult.length === 0 &&
                <>
                    <RecordTitle>
                        搜尋紀錄
                    </RecordTitle>
                    <RecordContainer>
                        {searchHistory?.map((history, index) => {
                            return (
                                <RecordItem
                                    key={index}
                                    history={history}
                                    index={index}
                                    handleRemoveSearchHistory={handleRemoveSearchHistory}
                                    handleHistoryTextToTextInput={handleHistoryTextToTextInput}
                                />
                            )
                        })}
                    </RecordContainer>
                </>
            }

            {searchResult.length !== 0 &&
                <>
                    <SearchResultTitle>
                        搜尋結果
                    </SearchResultTitle>
                    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :

                        <CardserCardList
                            data={searchResult}
                            handleReachEnd={() => getCardInfoBySearch(page + 1)}
                        />

                    }
                </>
            }
        </FindScreenContainer>
    );
}

function RecordItem({ history, index, handleRemoveSearchHistory, handleHistoryTextToTextInput }: {
    history: string
    index: number
    handleRemoveSearchHistory: (history: string) => void
    handleHistoryTextToTextInput: (history: string) => void
}) {
    return (
        <RecordItemContainer key={index}>
            <RecordItemTextAndIconContainer>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <TouchableWithoutFeedback onPress={() => handleHistoryTextToTextInput(history)}>
                    <RecordItemText>
                        {history}
                    </RecordItemText>
                </TouchableWithoutFeedback>
            </RecordItemTextAndIconContainer>

            <RecordItemCloseIconContainer>
                <TouchableWithoutFeedback onPress={() => handleRemoveSearchHistory(history)}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableWithoutFeedback>
            </RecordItemCloseIconContainer>
        </RecordItemContainer>
    );
}

const FindScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const InputContainer = styled.View`
    position: relative;
    width: 100%;
    height: 60px;
    background: rgba(192, 203, 200, 0.5);
    border-radius: 9px;
    margin-top: 10px;
`

const Input = styled.TextInput`
    padding: 0px 0px 0px 40px;
    width: 100%;
    height: 100%;
`

const RecordTitle = styled.Text`
    margin-top: 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #8D8C8C;
`

const RecordItemContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
`

const RecordItemText = styled.Text`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #8D8C8C;
    margin-left: 10px;
`

const RecordContainer = styled.View`
    margin-top: 10px;
    padding: 0px 10px;
    width: 100%;
`

const RecordItemTextAndIconContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const RecordItemCloseIconContainer = styled.View`

`

const SearchResultTitle = styled.Text`
    margin-top: 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #8D8C8C;
`

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 10,
        top: 18
    }
})
