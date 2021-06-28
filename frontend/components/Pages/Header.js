import React from 'react'
import styled from "styled-components/native"
import { scale, verticalScale } from 'react-native-size-matters';

export default function Header({imagePath, text, fontSize, imageLeft, margin}) {
    const Container = styled.View`
        margin: 0 auto;
        align-items: center;
        margin-top: ${verticalScale(40)}px;
        display: flex;
        width: ${scale(295)}px;
        height: ${scale(85)}px;
        flex-direction: ${imageLeft ? "row" : "row-reverse"};
    `

    const Icon = styled.Image`
        height: ${scale(85)}px;
        width: ${scale(155)}px;
    `

    const MenuText = styled.Text`
        font-family: "OpenSans_800ExtraBold";
        color: white;
        align-self: center;
        ${margin && `margin: ${margin};`}
        font-size: ${scale(parseInt(fontSize))}px;
    `;

    return (
        <Container>
            <Icon source={imagePath}></Icon>
            <MenuText>{text}</MenuText>
        </Container> 
    )
}
