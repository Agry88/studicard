import styled from "styled-components/native";
import StudiCardTitle from "../components/atoms/ScreenTitle";
import { StyleSheet } from "react-native";
import Card from "../components/atoms/Card";
import ProfileCardList from "../components/atoms/profile-item";

export default function SettingScreen() {
    return (
        <SettingScreenContainer>
            <StudiCardTitle text="StudiCard" />
            <CardLabel>
                帳號設定
            </CardLabel>
            <Card
                style={styles.Card}
                cardColor="#fff"
                isShadow={true}
            >
                <ProfileCardList data={["個人資料", "更改密碼"]} onPress={() => console.log("test")} />
            </Card>
            <CardLabel>
                關於系統
            </CardLabel>
            <Card
                style={{ ...styles.Card, height: 200 }}
                cardColor="#fff"
                isShadow={true}
            >
                <ProfileCardList data={["學習提醒", "深色模式", "給予好評"]} onPress={() => console.log("test")} />
            </Card>
        </SettingScreenContainer>
    );
}
const styles = StyleSheet.create({
    Card: {
        width: "100%",
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    }
})


const SettingScreenContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 80px 20px 0px 20px;
`

const CardLabel = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 20px 10px;
`