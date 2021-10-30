import React from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import * as Device from "expo-device";

const Header = () => {
  const isAndroid = Device.osName === "Android" ? true : false;
  const Container = styled.View`
    margin-top: ${verticalScale(35)}px;
    margin-left: ${moderateScale(15)}px;
    align-items: flex-start;
  `;

  const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
  `;

  const Logo = styled.Image`
    max-width: ${moderateScale(50)}px;
    max-height: ${moderateScale(50)}px;
  `;

  const TextLower = styled.Text`
    color: white;
    align-self: flex-end;
    letter-spacing: 7px;
    margin-bottom: -${moderateScale(4)}px;
    margin-left: ${moderateScale(5)}px;
    ${isAndroid
      ? `font-size: ${moderateScale(50)}px;`
      : `font-size: ${moderateScale(50)}px;`}
    font-family: Momcake;
    transform: scale(1, 0.9);
  `;

  return (
    <Container>
      <HeaderContainer>
        <Logo source={require("../../assets/nexus-logo.png")} />
        <TextLower>EXUS</TextLower>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
