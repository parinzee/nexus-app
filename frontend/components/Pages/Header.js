import React from "react";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

export default function Header({ text, fontSize }) {
  const navigation = useNavigation();
  const Container = styled.Pressable`
    margin-top: ${verticalScale(35)}px;
    margin-right: ${moderateScale(30)}px;
    margin-left: ${moderateScale(30)}px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
  `;

  const MenuText = styled.Text`
    font-family: System;
    color: white;
    align-self: center;
    font-size: ${moderateScale(parseInt(fontSize))}px;
    margin-bottom: -${moderateScale(5)}px;
    align-self: flex-end;
  `;

  const Logo = styled.Image`
    max-width: ${moderateScale(parseInt(fontSize))}px;
    max-height: ${moderateScale(parseInt(fontSize))}px;
  `;

  return (
    <Container onPress={() => navigation.navigate("Credits")}>
      <MenuText>{text}</MenuText>
      <Logo source={require("../../assets/nexus-logo.png")} />
    </Container>
  );
}
