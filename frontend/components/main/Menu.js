import React from "react";
import styled from "styled-components/native";
import { scale } from "react-native-size-matters";

function MenuSelector({ imagePath, text, backgroundColor, fontSize, style, margin }) {
    const MenuImage = styled.Image`
        width: auto;
        height: auto;
        max-height: ${scale(115)}px;
        max-width: ${scale(155)}px;
    `;
    if (style == 1) {
        const Container = styled.View`
            background-color: ${backgroundColor};
            margin-top: ${scale(20)}px;
            display: flex;
            width: ${scale(295)}px;
            height: ${scale(85)}px;
            flex-direction: row;
            border-radius: 16px;
            font-size: ${scale(fontSize)}px;
        `;

        const MenuText = styled.Text`
            font-family: "Open Sans", sans-serif;
            align-self: center;
        `;
    } else {
        const Container = styled.View`
            background-color: ${backgroundColor};
            margin-top: ${scale(20)}px;
            display: flex;
            width: ${scale(295)}px;
            height: ${scale(85)}px;
            flex-direction: row-reverse;
            border-radius: 16px;
            font-size: ${scale(fontSize)}px;
        `;

        const MenuText = styled.Text`
            font-family: "Open Sans", sans-serif;
            align-self: center;
            margin: ${margin};
        `;
    }

    return (
        <Container>
            <MenuImage source={require(imagePath)} />
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
    return <Container></Container>;
}
