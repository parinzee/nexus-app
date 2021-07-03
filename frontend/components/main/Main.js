import React, { useEffect } from "react";
import styled from "styled-components/native";
import Header from "./Header";
import Menu from "./Menu";
import { Asset } from "expo-asset";
import { TouchableOpacity } from "react-native";

export default function Main({navigation}) {
    const fetchImages = () => {
        const images = [
            require("../../assets/glowingBlob.gif"),
            require("../../assets/web.png"),
            require("../../assets/100.png"),
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
        navigation.navigate("Credits")
    }

    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
        color: white;
        margin: 0;
    `;
    return (
        <Container>
            <TouchableOpacity activeOpacity="1" onPress={() => handlePress()}>
                <Header />
            </TouchableOpacity>
            <Menu />
        </Container>
    );
}
