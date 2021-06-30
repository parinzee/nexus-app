import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Header from "../Header";
import { scale, verticalScale } from "react-native-size-matters";
import { Dimensions } from "react-native";
import * as Linking from "expo-linking"

const entries = [
    {
        id: "1",
        text: "NEXUS WEBSITE",
        imagePath: require("../../../assets/web.png"),
        link: "https://www.nexusbcis.com",
    },
    {
        id: "2",
        text: "HOUSE TEAM",
        imagePath: require("../../../assets/100.png"),
        link: "https://nexushta.onuniverse.com",
    },
    {
        id: "3",
        text: "INSTAGRAM",
        imagePath: require("../../../assets/instagram.png"),
        link: "https://instagram.com/nexussc",
    },
    {
        id: "4",
        text: "TIK TOK",
        imagePath: require("../../../assets/tiktok.png"),
        link: "https://vt.tiktok.com/ZGJhG1cB8/",
    },
    {
        id: "5",
        text: "LINE",
        imagePath: require("../../../assets/line.png"),
        link: "https://lin.ee/UZEqeTH",
    },
    {
        id: "6",
        text: "COVID UPDATES",
        imagePath: require("../../../assets/covid.png"),
        link: "https://covid19.who.int",
    },
];

const LinkEntry = ({ text, imagePath, link }) => {
    
    const handlePress = () => {
        Linking.openURL(link)
    }

    const Container = styled.TouchableOpacity`
        display: flex;
        flex-direction: row;
        background-color: #fccf04;
        border-radius: 20px;
        width: ${scale(295)}px;
        height: ${scale(50)}px;
        margin-top: ${verticalScale(22)}px;
        padding: 5px;
        box-shadow: 0px 0px 10px #fccf04;
        margin-right: 20px;
        margin-left: 20px;
    `;
    const ListIcon = styled.Image`
        width: 20%;
        height: auto;
    `;

    const ListText = styled.Text`
        color: white;
        font-size: ${scale(20)}px;
        font-family: "OpenSans_800ExtraBold";
        align-self: center;
        margin-left: 10px;
    `;

    return (
            <Container onPress={handlePress}>
                <ListIcon source={imagePath} />
                <ListText>{text}</ListText>
            </Container>
    );
};

export default function Links() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;

    const ListContainer = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-top: ${verticalScale(10)}px;
        width: ${windowWidth}px;
        height: ${windowHeight}px;
    `;

    const renderEntry = ({ item }) => (
        <LinkEntry
            text={item.text}
            imagePath={item.imagePath}
            link={item.link}
        />
    );

    return (
        <Container>
            <Header
                imagePath={require("../../../assets/sleepingMan.gif")}
                text="LINKS"
                fontSize="35"
                imageLeft={true}
            />

            <ListContainer>
                <FlatList
                    data={entries}
                    renderItem={renderEntry}
                    keyExtractor={(entry) => entry.id}
                    scrollEnabled={false}
                />
            </ListContainer>
        </Container>
    );
}
