import styled from "styled-components/native";
import StudiCardTitle from "../components/atoms/ScreenTitle";
import { StyleSheet } from "react-native";
import Card from "../components/atoms/Card";
import ProfileCardList from "../components/atoms/profile-item";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export default function SettingScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

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
                <ProfileCardList
                    data={[
                        {
                            text: "個人資料",
                            onPress: () => console.log("navigation")
                        },
                        {
                            text: "更改密碼",
                            onPress: () => console.log("navigation")
                        }
                    ]}
                />
            </Card>
            <CardLabel>
                關於系統
            </CardLabel>
            <Card
                style={{ ...styles.Card, height: 200 }}
                cardColor="#fff"
                isShadow={true}
            >
                <ProfileCardList
                    data={[
                        {
                            text: "學習提醒",
                            onPress: () => console.log("navigation")
                        },
                        {
                            text: "深色模式",
                            onPress: () => console.log("navigation")
                        },
                        {
                            text: "給予好評",
                            onPress: () => console.log("navigation")
                        },
                        {
                            text: "登出",
                            onPress: async () => {
                                navigation.navigate("AuthStack")
                                await AsyncStorage.removeItem("@token")
                                showMessage({
                                    type: "success",
                                    message: "登出成功"
                                })
                            }
                        },
                    ]}
                />
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