import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import styled from 'styled-components/native';
import StudiCardTitle from '../components/atoms/ScreenTitle';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function FindScreen() {

    return (
        <FindScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <InputContainer>
                <Input onBlur={() => console.log("searching in blur")} />
                <TouchableWithoutFeedback onPress={() => console.log("searching")}>
                    <Entypo name="magnifying-glass" style={styles.icon} size={24} color="black" />
                </TouchableWithoutFeedback>
            </InputContainer>
            <RecordTitle>
                搜尋紀錄
            </RecordTitle>
            <RecordContainer>

                <RecordItem>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <TouchableWithoutFeedback>
                        <RecordItemText>
                            搜尋紀錄1
                        </RecordItemText>
                    </TouchableWithoutFeedback>
                </RecordItem>
                
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

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 10,
        top: 18
    }
})
