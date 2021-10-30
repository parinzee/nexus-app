import React from "react";
import styled from "styled-components/native";
import * as Linking from "expo-linking";
import { FlatList } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fab"
      data-icon="tiktok"
      className="prefix__svg-inline--fa prefix__fa-tiktok prefix__fa-w-14"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ width: moderateScale(40), height: moderateScale(40) }}
      {...props}
    >
      <Path
        fill="#52575D"
        d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z"
      />
    </Svg>
  );
}

const entries = [
  {
    id: "3",
    text: "Instagram",
    icon: (
      <MaterialCommunityIcons
        name="instagram"
        size={moderateScale(40)}
        color="#EB6383"
      />
    ),
    link: "https://instagram.com/nexussc",
  },
  {
    id: "5",
    text: "Line",
    icon: <FontAwesome5 name="line" size={moderateScale(40)} color="#70AF85" />,
    link: "https://lin.ee/UZEqeTH",
  },
  {
    id: "1",
    text: "Nexus Website",
    icon: (
      <MaterialCommunityIcons
        name="web"
        size={moderateScale(40)}
        color="#6886C5"
      />
    ),
    link: "https://www.nexusbcis.com",
  },
  {
    id: "2",
    text: "House Teams",
    icon: (
      <MaterialCommunityIcons
        name="flag-variant"
        size={moderateScale(40)}
        color="#8F4068"
      />
    ),
    link: "https://nexushta.onuniverse.com",
  },
  {
    id: "4",
    text: "Tik Tok",
    icon: <SvgComponent />,
    link: "https://vt.tiktok.com/ZGJhG1cB8/",
  },
];

const Item = ({ text, link, icon }) => {
  const PressMe = styled.TouchableOpacity``;
  const ItemContainer = styled.View`
    width: ${moderateScale(300)}px;
    height: ${verticalScale(55)}px;
    background-color: #f2e1c1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${verticalScale(50)}px;
    border-radius: 20px;
  `;
  const NameText = styled.Text`
    font-family: System;
    font-size: ${moderateScale(20)}px;
    font-weight: bold;
    color: black;
    margin-right: 20px;
  `;

  const IconContainer = styled.View`
    margin-left: 20px;
  `;

  return (
    <PressMe onPress={() => Linking.openURL(link)}>
      <ItemContainer>
        <IconContainer>{icon}</IconContainer>
        <NameText>{text}</NameText>
      </ItemContainer>
    </PressMe>
  );
};

export default function Contact() {
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <Container>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <Item text={item.text} icon={item.icon} link={item.link} />
        )}
      />
    </Container>
  );
}
