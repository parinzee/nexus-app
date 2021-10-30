import React, { useEffect, useState } from "react";
import { Vibration, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Audio } from "expo-av";

export default function Clicker() {
  const [clicks, setClicks] = useState(0);

  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    justify-content: center;
    align-items: center;
  `;
  const Counter = styled.Text`
    font-family: System;
    color: white;
    font-size: ${moderateScale(30)}px;
    position: absolute;
    bottom: ${verticalScale(10)}px;
  `;
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/click.mp3")
    );
    sound.playAsync();
  }

  const handlePress = async () => {
    Vibration.vibrate();
    playSound();
    if (clicks >= 1000) {
      setClicks(0);
      AsyncStorage.setItem("@counter", JSON.stringify(0));
    } else {
      setClicks(clicks + 1);
      AsyncStorage.setItem("@counter", JSON.stringify(clicks + 1));
    }
  };

  useEffect(() => {
    async function getCounts() {
      const counts = JSON.parse(await AsyncStorage.getItem("@counter"));
      if (counts === null) {
        Alert.alert("Sound", "Please turn sound on.", [{ text: "Ok" }]);
      } else {
        setClicks(counts);
      }
    }
    getCounts();
  }, []);

  return (
    <Container>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        style={{
          width: moderateScale(200) - 0.2 * clicks,
          height: moderateScale(200) - 0.2 * clicks,
          backgroundColor: "#CA8A8B",
          alignSelf: "center",
          borderRadius: clicks * 0.1,
        }}
      />
      <Counter>{clicks}</Counter>
    </Container>
  );
}
