import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import Header from "./Header";
import Menu from "./Menu";
import { Asset } from "expo-asset";
import { TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function Main({ navigation }) {
    const fetchImages = () => {
        const images = [
            require("../../assets/glowingBlob.gif"),
            require("../../assets/nexus-icon.png"),
            require("../../assets/houseTeam.png"),
            require("../../assets/instagram.png"),
            require("../../assets/tiktok.png"),
            require("../../assets/line.png"),
            require("../../assets/covid.png"),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        return Promise.all(cacheImages);
    };
    const preload = async () => {
        const imageAssets = fetchImages();
        await Promise.all([imageAssets]);
    };

    useEffect(() => {
        preload();
    });

    const handlePress = async () => {
        navigation.navigate("Credits");
    };

    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
        display: flex;
        justify-content: center;
        align-content: center;
    `;

    const BCISTEXT = styled.Text`
        padding-top: ${verticalScale(7)}px;
        font-family: Now;
        font-size: ${moderateScale(10)}px;
        color: grey;
        text-align: center;
    `;

    const AnotherContainer = styled.View``;
    return (
        <Container>
            <AnotherContainer>
                <TouchableOpacity
                    activeOpacity="1"
                    onPress={() => handlePress()}
                >
                    <Header />
                </TouchableOpacity>
                <ScrollView>
                    <Menu />
                </ScrollView>
                <BCISTEXT>BCIS Student Council 2021-22</BCISTEXT>
            </AnotherContainer>
        </Container>
    );
}
