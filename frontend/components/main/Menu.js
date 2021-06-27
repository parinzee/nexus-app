import React from "react";
import styled from "styled-components/native";
import { scale } from "react-native-size-matters";

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
    `;
    const Container = styled.View`
        background-color: ${backgroundColor};
        margin-top: ${scale(20)}px;
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
        ${margin && `margin: ${margin};`}
        font-size: ${scale(parseInt(fontSize))}px;
    `;

    return (
        <Container>
            <MenuImage source={imagePath} />
            <MenuText>{text}</MenuText>
        </Container>
    );
}

export default function Main() {
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    `;
    return (
        <Container>
            <MenuSelector
                imagePath={require("../../assets/sleepingMan.gif")}
                text="LINKS"
                backgroundColor="#fccf04"
                fontSize="25"
                imageLeft={true}
            />
            <MenuSelector
                imagePath={require("../../assets/typingMan.gif")}
                text={`UPCOMING ${"\n"}EVENTS`}
                backgroundColor="#ff5758"
                fontSize="22"
                imageLeft={false}
            />
            <MenuSelector
                imagePath={require("../../assets/AGuy.gif")}
                text={`UPCOMING ${"\n"}ACTIVITIES`}
                backgroundColor="#5071f6"
                fontSize="22"
                imageLeft={true}
            />
            <MenuSelector
                imagePath={require("../../assets/teacher.gif")}
                text={`QUARTERLY${"\n"}COMPETITIONS`}
                backgroundColor="#ff9151"
                fontSize="18"
                imageLeft={false}
            />
        </Container>
    );
}
