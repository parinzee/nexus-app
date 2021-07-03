import React from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from 'react-native-size-matters';
import * as Device from 'expo-device';


const Header = () => {
    const isAndroid = Device.osName === "Android" ? true : false
    const Container = styled.View`
        margin: 0 auto;
        align-items: center;
    `;

    const HeaderContainer = styled.View`
        margin-top: ${verticalScale(33)}px;
        display: flex;
        flex-direction: row;
    `;

    const Logo = styled.Image`
        max-width: ${moderateScale(100)}px;
        max-height: ${moderateScale(100)}px;
    `;

    const HeaderText = styled.View`
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        text-align: left;
        align-content: flex-end;
    `;

    const TextUpper = styled.Text`
        color: white;
        font-family: Now;
        padding-top: ${moderateScale(10)}px;
        font-size: ${moderateScale(16)}px;
    `;

    const TextLower = styled.Text`
        color: white;
        margin-top: ${moderateScale(3)}px;
        padding: 0;
        letter-spacing: 7px;
        ${isAndroid ? `font-size: ${moderateScale(55)}px;` : `font-size: ${moderateScale(65)}px;`}
        transform: scale(1, 0.75);
    `;

    return (
        <Container>
            <HeaderContainer>
                <Logo source={require("../../assets/nexus-logo.png")} />
                <HeaderText>
                    <TextUpper>Elevate BCIS Together.</TextUpper>
                    <TextLower>EXUS</TextLower>
                </HeaderText>
            </HeaderContainer>
        </Container>
    );
};

export default Header;
