import React, { useEffect, useState } from "react"
import {Vibration} from "react-native"
import styled from "styled-components/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { moderateScale, verticalScale } from "react-native-size-matters"
import Ripple from 'react-native-advanced-ripple'
import {Audio} from "expo-av"

export default function Clicker() {
  const [clicks, setClicks] = useState(0)

  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    justify-content: center;
    align-items: center;
  `
  const Counter = styled.Text`
    font-family: System;
    color: white;
    font-size: ${moderateScale(30)}px;
    position: absolute;
    bottom: ${verticalScale(10)}px;
  `
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/click.mp3')
    );
    await sound.playAsync()
  }

  const handlePress = async () => {
    await playSound()
    await AsyncStorage.setItem("@counter", JSON.stringify(clicks + 1))
    setTimeout(() => setClicks(clicks + 1), 500)
    Vibration.vibrate()
  }

  useEffect(() => {
    async function getCounts() {
      const counts = JSON.parse(await AsyncStorage.getItem("@counter"))
      if (counts === null) {
        setClicks(0)
        await AsyncStorage.setItem("@counter", 0)
      } else {
        setClicks(counts)
      }
    }
    getCounts()
  })

  return (
    <Container>
      <Ripple onPress={handlePress} containerStyle={{ width: moderateScale(100), height: moderateScale(100), backgroundColor: "white", alignSelf: "center" }} borderless={true} duration={500} />
      <Counter>{clicks}</Counter>
    </Container>
  )
}
