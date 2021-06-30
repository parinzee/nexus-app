import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "./Header";
import Menu from "./Menu"
import { Asset } from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

export default function Main({navigation}) {
    const [updated, setUpdated] = useState(false)

    const getUpdated = async () => {
        const localUpdated = await AsyncStorage.getItem("@localUpdated")
        const lastEdited = await axios.get("https://nexussc.herokuapp.com/lastEdited").then(res => res.data)
        if (lastEdited != localUpdated) {
            setUpdated(false) 
            await AsyncStorage.setItem("@localUpdated", lastEdited)
            console.log("i'm here")
        } else {
            setUpdated(true)
            console.log("Not there")
        }
    }

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

    useEffect(() => {fetchImages(); getUpdated()})

    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
        color: white;
        margin: 0;
    `;
    return (
        <Container>
            <Header />
            <Menu /> 
        </Container>
    );
}
