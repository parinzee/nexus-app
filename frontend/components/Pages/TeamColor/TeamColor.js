import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Header";
import * as Notifications from "expo-notifications";
import { LogBox, RefreshControl } from "react-native";
import Scores from "./Scores";
import Content from "../Content";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export default function Activities({}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    justify-content: center;
    align-content: center;
  `;

  const AnotherContainer = styled.ScrollView``;

  const forceUpdate = useForceUpdate();

  const resetNotificationBadgeCount = async () => {
    await Notifications.setBadgeCountAsync(0);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    resetNotificationBadgeCount();
  }, []);

  return (
    <Container>
      <Header text="Team Colors" fontSize="35" />
      <AnotherContainer
        refreshControl={
          <RefreshControl
            tintColor="white"
            colors={["white"]}
            refreshing={refreshing}
            onRefresh={forceUpdate}
          />
        }
        indicatorStyle="white"
      >
        <Scores uri="https://nbcis.herokuapp.com/scores/" mainColor="#ff9151" />

        <Content
          uri="https://nbcis.herokuapp.com/events/"
          mainColor="#5F939A"
          type="activities"
        />
      </AnotherContainer>
    </Container>
  );
}
