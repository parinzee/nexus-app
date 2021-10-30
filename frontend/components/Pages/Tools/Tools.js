import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";
import useStoreInfo from "../../store";
import FootNote from "../Footnote";

export default function Tools({ navigation, route }) {
  const clicker = useStoreInfo((state) => state.clicker);
  const updateStore = useStoreInfo((state) => state.setDeviceInfo);
  try {
    const { navigateTo } = route.params;
    setTimeout(() => {
      navigation.navigate(navigateTo, { grade, honors });
    }, 400);
  } catch {}
  const grade = useStoreInfo((state) => state.grade);
  const honors = useStoreInfo((state) => state.honors);
  if (clicker != true) {
    var Destinations = [
      {
        title: "Grade Calculator (4.00/4.50)",
        icon: (
          <FontAwesome5
            name="calculator"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Grade Calculator",
        gradient: false,
      },
      {
        title: "My Tasks",
        icon: (
          <FontAwesome5
            name="clipboard-list"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "My Tasks",
        gradient: false,
      },
      {
        title: "Tic Tac Toe",
        icon: (
          <FontAwesome5 name="gamepad" size={moderateScale(24)} color="white" />
        ),
        destination: "Tic Tac Toe",
        gradient: false,
      },
      {
        title: "Clicker (Stress Reliever)",
        icon: (
          <FontAwesome5
            name="hand-pointer"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Clicker",
        gradient: false,
      },
      {
        title: "Contact Us",
        icon: (
          <FontAwesome5
            name="question-circle"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Contact Us",
        gradient: false,
      },
    ];
  } else {
    var Destinations = [
      {
        title: "Grade Calculator (4.00/4.50)",
        icon: (
          <FontAwesome5
            name="calculator"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Grade Calculator",
        gradient: false,
      },
      {
        title: "My Tasks",
        icon: (
          <FontAwesome5
            name="clipboard-list"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "My Tasks",
        gradient: false,
      },
      {
        title: "Tic Tac Toe",
        icon: (
          <FontAwesome5 name="gamepad" size={moderateScale(24)} color="white" />
        ),
        destination: "Tic Tac Toe",
        gradient: false,
      },
      {
        title: "Popcat Game (Relaxation)",
        icon: (
          <FontAwesome5 name="cat" size={moderateScale(24)} color="white" />
        ),
        destination: "PopCat",
        gradient: false,
      },
      {
        title: "Clicker (Relaxation)",
        icon: (
          <FontAwesome5
            name="hand-pointer"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Clicker",
        gradient: false,
      },
      {
        title: "Popcat Event Results (27-30 Sep)",
        icon: (
          <FontAwesome5
            name="chart-bar"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "PopCat Leaderboard",
        gradient: false,
      },
      {
        title: "Contact Us",
        icon: (
          <FontAwesome5
            name="question-circle"
            size={moderateScale(24)}
            color="white"
          />
        ),
        destination: "Contact Us",
        gradient: false,
      },
    ];
  }

  useEffect(() => {
    updateStore();
  }, []);
  const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: #121212;
  `;

  const BottomContainer = styled.View`
    margin-top: ${verticalScale(30)}px;
  `;

  return (
    <Container>
      <Header text="Tools" fontSize="35" />
      <BottomContainer>
        {Destinations.map(({ title, icon, destination, gradient }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(destination, { grade, honors });
            }}
            key={title}
          >
            {gradient ? (
              <ListItem
                bottomDivider
                containerStyle={{
                  backgroundColor: "#121212",
                }}
                linearGradientProps={{
                  colors: ["#FF9800", "#F44336"],
                  start: { x: 1, y: 0 },
                  end: { x: 0.2, y: 0 },
                }}
                ViewComponent={LinearGradient}
              >
                {icon}
                <ListItem.Content>
                  <ListItem.Title style={{ color: "white" }}>
                    {title}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ) : (
              <ListItem
                bottomDivider
                containerStyle={{
                  backgroundColor: "#121212",
                }}
              >
                {icon}
                <ListItem.Content>
                  <ListItem.Title style={{ color: "white" }}>
                    {title}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )}
          </TouchableOpacity>
        ))}
      </BottomContainer>
      <FootNote />
    </Container>
  );
}
