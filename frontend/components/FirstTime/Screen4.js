import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreInfo from "../store";

export default function Screen4({ navigation }) {
  const updateStore = useStoreInfo((state) => state.setDeviceInfo);
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
    font-size: ${moderateScale(45)}px;
    font-family: Now;
    color: white;
    margin-bottom: ${verticalScale(40)}px;
  `;

  const Description = styled.Text`
    text-align: center;
    font-size: ${moderateScale(20)}px;
    font-family: Now;
    color: white;
    margin-top: ${verticalScale(10)}px;
    margin-bottom: ${verticalScale(10)}px;
  `;

  const handlePress = async () => {
    await AsyncStorage.setItem("@firstTime", JSON.stringify(false));
    await updateStore();
    navigation.navigate("MainTab");
  };

  return (
    <Container>
      <InsideContainer>
        <LottieView
          source={require("../../assets/Finish.json")}
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
        <HiText>You're Done!</HiText>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome5
            name="arrow-circle-right"
            size={50}
            color="white"
            style={{
              alignSelf: "center",
              marginTop: verticalScale(30),
            }}
          />
        </TouchableOpacity>
      </InsideContainer>
    </Container>
  );
}
