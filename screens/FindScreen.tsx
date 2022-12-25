import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import styled from 'styled-components/native';
import StudiCardTitle from '../components/atoms/ScreenTitle';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FindScreen() {

    const [search, setSearch] = useState<string>()
    const [searchHistory, setSearchHistory] = useState<string[]>([])


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
            if (!search) return
            if(searchHistory?.includes(search)) return
            const history = await AsyncStorage.getItem('@search_history')
            const c = history ? JSON.parse(history) : []
            c.push(search)
            await AsyncStorage.setItem('@search_history', JSON.stringify(c));
            setSearchHistory(prev => [...prev, search])
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

    return (
        <FindScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <InputContainer>
                <Input onBlur={handleSearch} onChangeText={text => setSearch(text)} />
                <TouchableWithoutFeedback onPress={handleSearch}>
                    <Entypo name="magnifying-glass" style={styles.icon} size={24} color="black" />
                </TouchableWithoutFeedback>
            </InputContainer>
            <RecordTitle>
                搜尋紀錄
            </RecordTitle>
            <RecordContainer>

                {searchHistory?.map((history,index) => {
                    return (
                        <RecordItem key={index}>
                            <RecordItemTextAndIconContainer>
                                <AntDesign name="clockcircleo" size={24} color="black" />
                                <TouchableWithoutFeedback>
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
                        </RecordItem>
                    )
                })}

            </RecordContainer>
        </FindScreenContainer>
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

const RecordItem = styled.View`
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

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 10,
        top: 18
    }
})
