import React from "react";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking"

function PrivacyPolicy({}) {
    const Container = styled.View`
        background-color: #3a6351;
        margin-top: ${verticalScale(15)}px;
        display: flex;
        flex-direction: row;
        width: ${moderateScale(100)}px;
        height: ${moderateScale(20)}px;
        border-radius: 16px;
        justify-content: center;
    `;

    const MenuText = styled.Text`
        font-family: "OpenSans_800ExtraBold";
        color: white;
        align-self: center;
        font-size: ${moderateScale(10)}px;
        align-self: center;
    `;

    return (
        <Container>
            <MenuText>Privacy Policy</MenuText>
        </Container>
    );
}

function MenuSelector({
    imagePath,
    text,
    backgroundColor,
    fontSize,
    imageLeft,
    margin,
}) {
    const MenuImage = styled.Image`
        height: ${moderateScale(85)}px;
        width: ${moderateScale(155)}px;
        ${margin && `margin-left: -${margin}px;`}
    `;
    const Container = styled.View`
        background-color: ${backgroundColor};
        margin-top: ${verticalScale(20)}px;
        display: flex;
        width: ${moderateScale(295)}px;
        height: ${moderateScale(85)}px;
        flex-direction: ${imageLeft ? "row" : "row-reverse"};
        border-radius: 16px;
    `;

    const MenuText = styled.Text`
        font-family: "OpenSans_800ExtraBold";
        color: white;
        align-self: center;
        font-size: ${moderateScale(parseInt(fontSize))}px;
    `;

    return (
        <Container>
            <MenuImage defaultSource={imagePath} source={imagePath} />
            <MenuText>{text}</MenuText>
        </Container>
    );
}

export default function Main() {
    const handlePrivacyPolicy = () => {
        Linking.openURL("https://github.com/Parinz/nexus-app/blob/main/frontend/PRIVACYPOLICY.md")
    }
    const navigation = useNavigation();
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-top: -10px;
    `;
    return (
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate("Links")}>
                <MenuSelector
                    imagePath={require("../../assets/sleepingMan.gif")}
                    text="LINKS"
                    backgroundColor="#fccf04"
                    fontSize="25"
                    imageLeft={true}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                <MenuSelector
                    imagePath={require("../../assets/typingMan.gif")}
                    text={`SCHOOL${"\n"}EVENTS`}
                    backgroundColor="#ff5758"
                    fontSize="25"
                    imageLeft={false}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Activities")}>
                <MenuSelector
                    imagePath={require("../../assets/AGuy.gif")}
                    text={`UPCOMING${"\n"}SC EVENTS`}
                    backgroundColor="#5071f6"
                    fontSize="22"
                    imageLeft={true}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Competitions")}
            >
                <MenuSelector
                    imagePath={require("../../assets/teacher.gif")}
                    text={`TEAM COLOR${"\n"}SCORES`}
                    backgroundColor="#ff9151"
                    fontSize="20"
                    imageLeft={false}
                    margin="10"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePrivacyPolicy()}>
                <PrivacyPolicy />
            </TouchableOpacity>
        </Container>
    );
}
