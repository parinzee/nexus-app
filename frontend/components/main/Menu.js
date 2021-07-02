import React from "react";
import styled from "styled-components/native";
import { scale, verticalScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MenuSelector({
    imagePath,
    text,
    backgroundColor,
    fontSize,
    imageLeft,
    margin,
}) {
    const MenuImage = styled.Image`
        height: ${scale(85)}px;
        width: ${scale(155)}px;
        ${margin && `margin-left: -${margin}px;`}
    `;
    const Container = styled.View`
        background-color: ${backgroundColor};
        margin-top: ${verticalScale(27)}px;
        display: flex;
        width: ${scale(295)}px;
        height: ${scale(85)}px;
        flex-direction: ${imageLeft ? "row" : "row-reverse"};
        border-radius: 16px;
    `;

    const MenuText = styled.Text`
        font-family: "OpenSans_800ExtraBold";
        color: white;
        align-self: center;
        font-size: ${scale(parseInt(fontSize))}px;
    `;

    return (
        <Container>
            <MenuImage defaultSource={imagePath} source={imagePath} />
            <MenuText>{text}</MenuText>
        </Container>
    );
}

export default function Main() {
    const navigation = useNavigation();
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
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
            <TouchableOpacity onPress={() => navigation.navigate("Competitions")}>
                <MenuSelector
                    imagePath={require("../../assets/teacher.gif")}
                    text={`TEAM COLOR${"\n"}SCORES`}
                    backgroundColor="#ff9151"
                    fontSize="20"
                    imageLeft={false}
                    margin="10"
                />
            </TouchableOpacity>
        </Container>
    );
}