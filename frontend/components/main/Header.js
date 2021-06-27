import React from "react";
import styled from "styled-components/native";
import { scale } from 'react-native-size-matters';

const Header = () => {
    const Container = styled.View`
        margin: 0 auto;
        align-items: center;
    `;

    const HeaderContainer = styled.View`
        margin-top: 40px;
        display: flex;
        flex-direction: row;
    `;

    const Logo = styled.Image`
        max-width: ${scale(100)}px;
        max-height: ${scale(100)}px;
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
        padding-top: ${scale(10)}px;
        font-size: ${scale(16)}px;
    `;

    const TextLower = styled.Text`
        color: white;
        margin-top: ${scale(3)}px;
        padding: 0;
        letter-spacing: 7px;
        font-size: ${scale(65)}px;
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
