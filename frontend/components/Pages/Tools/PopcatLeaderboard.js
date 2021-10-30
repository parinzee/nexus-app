// LEADBERBOARD ONLY
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function Item_Team({ index, name, score }) {
  var bgColor;
  if (name === "red") {
    bgColor = "background-color: #D35D6E;";
  } else if (name === "blue") {
    bgColor = "background-color: #87A7B3;";
  } else if (name === "yellow") {
    bgColor = "background-color: #FFCF64;";
  } else {
    bgColor = "background-color: #83B582";
  }

  const Container = styled.View`
    background-color: #f2e1c1;
    display: flex;
    border-radius: 10px;
    width: ${moderateScale(320)}px;
    height: ${moderateScale(46)}px;
    margin-top: ${verticalScale(14)}px;
    padding: 5px;
    justify-content: center;
    align-content: center;
    align-self: center;
  `;

  const InnerContainer = styled.View`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    width: ${moderateScale(314)}px;
    height: ${moderateScale(40)}px;
    padding: 5px;
    ${bgColor}
    padding-right: 30px;
    padding-left: 10px;
    align-self: center;
    justify-content: space-between;
  `;

  const TitleText = styled.Text`
    color: black;
    font-size: ${moderateScale(17)}px;
    font-family: System;
    font-weight: bold;
    margin-left: 10px;
    align-self: center;
  `;

  const SubtitleText = styled.Text`
    color: black;
    font-size: ${moderateScale(17)}px;
    font-family: System;
    font-weight: bold;
    margin-left: 10px;
    align-self: center;
  `;

  return (
    <Container>
      <InnerContainer>
        <TitleText>
          {`${index}. `} {name.charAt(0).toUpperCase() + name.slice(1)}
        </TitleText>
        <SubtitleText>{score} pt</SubtitleText>
      </InnerContainer>
    </Container>
  );
}

function Item({ index, name, score }) {
  var bgColor;
  if (index === 1) {
    bgColor = "background-color: #f8d62c;";
  } else if (index === 2) {
    bgColor = "background-color: #aab0b3;";
  } else if (index === 3) {
    bgColor = "background-color: #b9722d;";
  } else {
    bgColor = "background-color: #fef9e3";
  }

  const Container = styled.View`
    background-color: #f2e1c1;
    display: flex;
    border-radius: 10px;
    width: ${moderateScale(320)}px;
    height: ${moderateScale(46)}px;
    margin-top: ${verticalScale(14)}px;
    padding: 5px;
    justify-content: center;
    align-content: center;
    align-self: center;
  `;

  const InnerContainer = styled.View`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    width: ${moderateScale(314)}px;
    height: ${moderateScale(40)}px;
    padding: 5px;
    ${bgColor}
    padding-right: 30px;
    padding-left: 10px;
    align-self: center;
    justify-content: space-between;
  `;

  const TitleText = styled.Text`
    color: black;
    font-size: ${moderateScale(17)}px;
    font-family: System;
    font-weight: bold;
    margin-left: 10px;
    align-self: center;
  `;

  const SubtitleText = styled.Text`
    color: black;
    font-size: ${moderateScale(17)}px;
    font-family: System;
    font-weight: bold;
    margin-left: 10px;
    align-self: center;
  `;

  return (
    <Container>
      <InnerContainer>
        <TitleText>
          {`${index}. `} {name}
        </TitleText>
        <SubtitleText>{score} pt</SubtitleText>
      </InnerContainer>
    </Container>
  );
}

function IndividualTab() {
  const [leaderboard, setLeadeboard] = useState({});
  useEffect(() => {
    async function setLeader() {
      const l = await axios
        .get("https://nbcis.herokuapp.com/popcat/leaderboard")
        .then((resp) => resp.data);
      setLeadeboard(l);
    }
    setLeader();
  }, []);
  return leaderboard != {} ? (
    <FlatList
      data={leaderboard.i}
      renderItem={({ item, index }) => (
        <Item index={index + 1} name={item[0]} score={item[1]} />
      )}
      keyExtractor={(items, index) => {
        return index.toString();
      }}
      scrollEnabled={true}
      style={{
        backgroundColor: "#121212",
      }}
    />
  ) : (
    <View style={{ height: 800 }}></View>
  );
}

function TeamTab() {
  const [leaderboard, setLeadeboard] = useState({});
  useEffect(() => {
    async function setLeader() {
      const l = await axios
        .get("https://nbcis.herokuapp.com/popcat/leaderboard")
        .then((resp) => resp.data);
      setLeadeboard(l);
    }
    setLeader();
  }, []);
  return leaderboard != {} ? (
    <FlatList
      data={leaderboard.t}
      renderItem={({ item, index }) => (
        <Item_Team index={index + 1} name={item[0]} score={item[1]} />
      )}
      keyExtractor={(items, index) => {
        return index.toString();
      }}
      scrollEnabled={true}
      style={{
        backgroundColor: "#121212",
      }}
    />
  ) : (
    <View style={{ height: 800 }}></View>
  );
}

export default function Popcat_Leaderboard() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{ safeAreaInsets: { top: 0 } }}
        tabBarOptions={{
          indicatorStyle: { backgroundColor: "white" },
          style: { backgroundColor: "#121212" },
          labelStyle: { color: "white" },
        }}
      >
        <Tab.Screen name="Individual" component={IndividualTab} />
        <Tab.Screen name="Team" component={TeamTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
