import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";
import { ScrollView, RefreshControl } from "react-native";
import * as Notifications from "expo-notifications";

export default function News({}) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
  `;

  const resetNotificationBadgeCount = async () => {
    await Notifications.setBadgeCountAsync(0);
  };

  useEffect(() => {
    resetNotificationBadgeCount();
  });

  return (
    <Container>
      <Header text={`News`} fontSize="35" />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="white"
            colors={["white"]}
            onRefresh={() => {
              forceUpdate();
            }}
          />
        }
        contentContainerStyle={{
          alignContent: "center",
          justifyContent: "center",
        }}
        indicatorStyle="white"
      >
        <Content
          uri="https://nbcis.herokuapp.com/announcements/"
          mainColor="#CC9B6D"
          type="news"
        />
      </ScrollView>
    </Container>
  );
}
