import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function Screen1({ navigation }) {
  const Container = styled.View`
    flex: 1;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    background-color: #121212;
  `;

  const InsideContainer = styled.View`
    justify-content: center;
    align-content: center;
  `;

  const HiText = styled.Text`
    text-align: center;
    font-size: ${moderateScale(40)}px;
    font-family: Now;
    color: white;
    margin-bottom: ${verticalScale(10)}px;
  `;

  const Description = styled.Text`
    text-align: center;
    font-size: ${moderateScale(15)}px;
    font-family: Now;
    color: grey;
    margin-top: ${verticalScale(10)}px;
    margin-bottom: ${verticalScale(10)}px;
  `;

  const LogoContainer = styled.View`
    padding: -10px;
    align-self: center;
    flex-direction: row;
  `;
  const NexusLogo = styled.Image`
    ${Platform.OS === "ios"
      ? `max-width: ${moderateScale(50)}px;
			max-height: ${moderateScale(50)}px;`
      : `max-width: ${moderateScale(50)}px;
			max-height: ${moderateScale(50)}px;
    		margin-bottom: -${verticalScale(5)}px;
    		`}
    align-self: center;
  `;

  const NexusText = styled.Text`
    color: white;
    align-self: flex-end;
    letter-spacing: 7px;
    margin-bottom: -${moderateScale(4)}px;
    margin-left: -${moderateScale(9)}px;
    font-size: ${moderateScale(50)}px;
    font-family: Momcake;
    transform: scale(0.8, 0.9);
  `;
  const handlePress = () => {
    navigation.navigate("Screen2");
  };

  return (
    <Container>
      <InsideContainer>
        <LottieView
          source={require("../../assets/Welcome.json")}
          autoPlay
          loop={false}
          speed={0.7}
          style={{
            position: "relative",
            alignSelf: "center",
            width: moderateScale(300),
            height: moderateScale(300),
          }}
        />
        <HiText>Hey there!</HiText>
        <Description>We are the BCIS Student Council</Description>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome5
            name="arrow-circle-right"
            size={50}
            color="white"
            style={{
              alignSelf: "center",
              marginBottom: verticalScale(30),
              marginTop: verticalScale(30),
            }}
          />
        </TouchableOpacity>
        <LogoContainer>
          <NexusLogo source={require("../../assets/nexus-logo.png")} />
          <NexusText>exus</NexusText>
        </LogoContainer>
      </InsideContainer>
    </Container>
  );
}
