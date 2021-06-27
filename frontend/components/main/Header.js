import React from "react";
import styled from "styled-components/native";

const Header = () => {
    const Container = styled.View`
        padding-top: 40px;
        margin: 0 auto;
        align-items: center;
    `;

    const HeaderContainer = styled.View`
        display: flex;
        flex-direction: row;
        margin: 0;
    `;

    const Logo = styled.Image`
        max-width: 104px;
        max-height: 104px;
    `;

    const HeaderText = styled.View`
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        text-align: left;
        flex-wrap: wrap;
        align-content: flex-end;
    `;

    const TextUpper = styled.Text`
        color: white;
        font-family: Now;
        margin: 0;
        margin-top: 13px;
        padding: 0;
        font-size: 17.6px;
    `;

    const TextLower = styled.Text`
        color: white;
        margin-top: 3px;
        padding: 0;
        letter-spacing: 7px;
        font-size: 65px;
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
