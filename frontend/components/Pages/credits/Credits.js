import React from "react";
import styled from "styled-components/native";
import { verticalScale, scale } from "react-native-size-matters";

export default function Credits() {
    const Container = styled.View`
        flex: 1;
        flex-direction: column;
        background-color: rgb(25, 25, 25);
    `;

    const Title = styled.Text`
        color: white;
        font-family: System;
        font-size: ${scale(20)}px;
        margin-top: ${verticalScale(15)}px;
        margin-bottom: ${verticalScale(10)}px;
        margin-left: 20px 
    `;

    const InfoTextContainer = styled.View`
        flex-direction: row;
        margin-top: ${verticalScale(20)}px
        border-bottom-color: grey;
        border-bottom-width: 0.2px;
        margin-left: 20px;
        margin-right: 20px;
        justify-content: space-between;
    `

    const FrontText = styled.Text`
        color: grey;
        font-family: System;
        font-size: ${scale(13)}px; 
    `

    const BackText = styled.Text`
        color: white;
        font-family: System;
        font-size: ${scale(13)}px; 
    `
    return (
        <Container>
            <Title>Information</Title>
            <InfoTextContainer><FrontText>Copyright</FrontText><BackText>© NEXUS Student Council 2021-22</BackText></InfoTextContainer>
            <InfoTextContainer><FrontText>Developer</FrontText><BackText>Parinthapat Pengpun</BackText></InfoTextContainer>
            <InfoTextContainer><FrontText>Designer</FrontText><BackText>Titus Chinsomboon</BackText></InfoTextContainer>
            <InfoTextContainer><FrontText>Version</FrontText><BackText>1.0.0</BackText></InfoTextContainer>
            <InfoTextContainer><FrontText>Last Updated</FrontText><BackText>July 2 2021</BackText></InfoTextContainer>
        </Container>
    );
}
