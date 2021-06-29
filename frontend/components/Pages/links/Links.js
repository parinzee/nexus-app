import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Header from "../Header";
import {scale, verticalScale} from "react-native-size-matters"
import { Dimensions } from "react-native";

const entries = [
    {
        id: "1",
        text: "NEXUS WEBSITE",
        imagePath: require("../../../assets/web.png")
    },
    {
        id: "2",
        text: "HOUSE TEAM",
        imagePath: require("../../../assets/100.png")
    },
    {
        id: "3",
        text: "INSTAGRAM",
        imagePath: require("../../../assets/instagram.png")
    },
    {
        id: "4",
        text: "TIK TOK",
        imagePath: require("../../../assets/tiktok.png")
    },
    {
        id: "5",
        text: "LINE",
        imagePath: require("../../../assets/line.png")
    },
    {
        id: "6",
        text: "COVID UPDATE",
        imagePath: require("../../../assets/covid.png")
    }
]


const LinkEntry = ({ text, imagePath }) => {
    const Container = styled.View`
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
    `
    const ListIcon = styled.Image`
        width: 20%; 
        height: auto;
    `

    const ListText = styled.Text`
        color: white;
        font-size: ${scale(20)}px;
        font-family: "OpenSans_800ExtraBold";
        align-self: center;
        margin-left: 10px;
    `

    return(
        <Container>
            <ListIcon source={imagePath}/>
            <ListText>{text}</ListText>
        </Container>
    )
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
    `

    const renderEntry = ({ item }) => (
        <LinkEntry text={item.text} imagePath={item.imagePath}/>
    )

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
                    keyExtractor={entry => entry.id}
                    scrollEnabled={false}
                />
            </ListContainer>
        </Container>
    );
}
