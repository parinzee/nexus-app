import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import {
  View,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Todo from "../Pages/Tools/Todo";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import FootNote from "../Pages/Footnote";
import { Item } from "../Pages/Content";

const dataSort = (a, b) => {
  // --!12/11
  // --11/22
  let [monthA, dateA] = a[2].split("--")[1].split("/");
  let [monthB, dateB] = b[2].split("--")[1].split("/");
  if (monthA.includes("!") && !monthB.includes("!")) {
    return -1;
  } else if (monthB.includes("!") && !monthA.includes("!")) {
    return 1;
  } else {
    monthA = monthA.replace("!", " ").trim();
    monthB = monthB.replace("!", " ").trim();
    if (parseInt(monthA) > parseInt(monthB)) {
      return -1;
    } else if (parseInt(monthA) < parseInt(monthB)) {
      return 1;
    } else if (parseInt(dateA) > parseInt(dateB)) {
      return -1;
    } else if (parseInt(dateA) < parseInt(dateB)) {
      return 1;
    } else {
      return b[0] - a[0];
    }
  }
};

const TeamColorWidget = ({ navigation }) => {
  const [item, setItem] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const realColors = ["#D35D6E", "#87A7B3", "#FFCF64", "#83B582"];

  const Container = styled.TouchableOpacity`
    background-color: #f2e1c1;
    display: flex;
    border-radius: 10px;
    width: ${moderateScale(320)}px;
    height: ${moderateScale(46)}px;
    margin-top: ${verticalScale(30)}px;
    padding: 5px;
    margin-right: 20px;
    margin-left: 20px;
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

  const getEvents = async (isMounted) => {
    const teamColor = JSON.parse(await AsyncStorage.getItem("@team"));
    const data = await axios
      .get("https://nbcis.herokuapp.com/scores/")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
    if (data != false) {
      let dataArray = [];
      for (let i = 1; i < 5; i++) {
        dataArray.push(data[0][i]);
      }
      const colors = ["RED", "BLUE", "YELLOW", "GREEN"];
      dataArray = dataArray.map((value, index) => {
        return {
          key: index,
          name: `${colors[index]}  TEAM`,
          score: value,
          color: realColors[index],
        };
      });
      if (isMounted === true) {
        const background =
          teamColor === "red"
            ? realColors[0]
            : teamColor === "blue"
            ? realColors[1]
            : teamColor === "yellow"
            ? realColors[2]
            : realColors[3];
        if (teamColor === "red") {
          setItem([dataArray[0], background]);
        } else if (teamColor === "blue") {
          setItem([dataArray[1], background]);
        } else if (teamColor === "yellow") {
          setItem([dataArray[2], background]);
        } else {
          setItem([dataArray[3], background]);
        }
        setRefresh(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    getEvents(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      {refresh === false ? (
        <Container onPress={() => navigation.navigate("Team Color")}>
          <InnerContainer style={{ backgroundColor: item[1] }}>
            <TitleText>{item[0].name}</TitleText>
            <SubtitleText>{item[0].score} pt</SubtitleText>
          </InnerContainer>
        </Container>
      ) : (
        <View />
      )}
    </View>
  );
};

const NewsWidget = ({ navigation }) => {
  const [latestNews, setLatestNews] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const getNews = async (isMounted) => {
    const data = await axios
      .get("https://nbcis.herokuapp.com/announcements/")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
    if (data != false) {
      if (isMounted) {
        setLatestNews(data.sort((a, b) => dataSort(a, b))[0]);
        setRefresh(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    getNews(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={{ alignSelf: "center" }}>
      {refresh === false ? (
        <TouchableOpacity onPress={() => navigation.navigate("News")}>
          <Item
            eventName={latestNews[1]}
            eventDesc={latestNews[2]}
            mainColor="#CC9B6D"
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const EventsWidget = ({ navigation }) => {
  const [latestNews, setLatestNews] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const getNews = async (isMounted) => {
    const data = await axios
      .get("https://nbcis.herokuapp.com/events/")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
    if (data != false) {
      if (isMounted) {
        setLatestNews(data.sort((a, b) => dataSort(a, b))[0]);
        setRefresh(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    getNews(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={{ alignSelf: "center" }}>
      {refresh === false ? (
        <TouchableOpacity onPress={() => navigation.navigate("Team Color")}>
          <Item
            eventName={latestNews[1]}
            eventDesc={latestNews[2]}
            mainColor="#5f939a"
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const GPAWidget = ({ navigation }) => {
  const [refresh, setRefresh] = useState(true);
  const [GPA, setGPA] = useState(null);
  const Container = styled.View`
    display: flex;
    flex-direction: row;
    background-color: black;
    border-radius: 20px;
    width: ${moderateScale(320)}px;
    height: ${verticalScale(60)}px;
    margin-top: ${verticalScale(30)}px;
    border-color: #45526c;
    border-width: 3px;
  `;

  const LeftContainer = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
    border-right-color: #45526c;
    border-right-width: 3px;
    justify-content: center;
    align-items: center;
  `;

  const TopText = styled.Text`
    font-family: System;
    color: white;
    font-size: ${moderateScale(20)}px;
    text-align: center;
  `;

  const BottomText = styled.Text`
    font-family: System;
    color: white;
    font-size: ${moderateScale(20)}px;
    font-weight: bold;
    text-align: center;
  `;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && refresh) {
      const getNews = async (isMounted) => {
        const data = JSON.parse(await AsyncStorage.getItem("@GPA"));
        setGPA(data);
        setRefresh(false);
      };
      getNews(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={{ alignSelf: "center" }}>
      <Container>
        <LeftContainer>
          <BottomText>GPA</BottomText>
        </LeftContainer>
        <View
          style={{
            alignSelf: "center",
            margin: "auto",
            width: "70%",
          }}
        >
          {GPA != null ? (
            <Button
              title={`  ${GPA.toString()}`}
              containerStyle={{
                alignSelf: "center",
                borderRadius: 15,
              }}
              buttonStyle={{
                backgroundColor: "#45526C",
                borderRadius: 15,
                borderColor: "white",
                borderWidth: 1,
              }}
              titleStyle={{
                fontSize: moderateScale(17),
                color: "white",
              }}
              icon={
                <FontAwesome5
                  name="calculator"
                  size={moderateScale(15)}
                  color="white"
                />
              }
              onPress={() => {
                navigation.navigate("Tools", {
                  navigateTo: "Grade Calculator",
                });
              }}
              raised={true}
            />
          ) : (
            <Button
              title="  Calculate Grade"
              containerStyle={{
                alignSelf: "center",
                borderRadius: 15,
              }}
              buttonStyle={{
                backgroundColor: "#45526C",
                borderRadius: 15,
                borderColor: "white",
                borderWidth: 1,
              }}
              titleStyle={{
                color: "white",
              }}
              onPress={() => {
                navigation.navigate("Tools", {
                  navigateTo: "Grade Calculator",
                });
              }}
              icon={
                <FontAwesome5
                  name="calculator"
                  size={moderateScale(15)}
                  color="white"
                />
              }
              raised={true}
            />
          )}
        </View>
      </Container>
    </View>
  );
};

const TaskWidget = ({ navigation }) => {
  const Container = styled.View`
    display: flex;
    flex-direction: column;
    background-color: black;
    border-radius: 20px;
    width: ${moderateScale(320)}px;
    height: ${verticalScale(230)}px;
    margin-top: ${verticalScale(30)}px;
    border-color: #f2e1c1;
    border-width: 3px;
  `;

  const Title = styled.Text`
    text-align: center;
    font-family: System;
    margin-top: ${verticalScale(5)}px;
    font-size: ${moderateScale(22)}px;
    font-weight: bold;
    color: white;
  `;

  const TitleContainer = styled.TouchableOpacity`
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    height: ${moderateScale(40)}px;
    width: 100%;
    border-bottom-color: #a0937d;
    border-bottom-width: 3px;
    background-color: rgb(50, 50, 50);
    margin-bottom: ${verticalScale(4)}px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: ${moderateScale(20)}px;
  `;

  return (
    <View style={{ alignSelf: "center" }}>
      <Container>
        <TitleContainer
          onPress={() => {
            navigation.navigate("Tools", {
              navigateTo: "My Tasks",
            });
          }}
        >
          <Title>My Tasks</Title>
          <Title>+</Title>
        </TitleContainer>
        <Todo hideAdd={true} />
      </Container>
    </View>
  );
};

const BibleVerseWidget = ({ navigation }) => {
  const [verse, setVerse] = useState(null);

  const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    background-color: black;
    border-radius: 20px;
    width: ${moderateScale(320)}px;
    margin-top: ${verticalScale(30)}px;
    border-color: #f2e1c1;
    border-width: 3px;
  `;

  const VerseText = styled.Text`
    font-family: Comfortaa_700Bold;
    color: white;
    text-align: center;
    font-size: ${moderateScale(17)}px;
  `;
  const Verse = styled.Text`
    font-family: Comfortaa_400Regular;
    color: white;
    text-align: center;
    font-size: ${moderateScale(20)}px;
    margin-top: ${verticalScale(20)}px;
  `;

  const getVerse = async (isMounted) => {
    const data = await axios
      .get("https://nbcis.herokuapp.com/verse/")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
    if (data != false) {
      if (isMounted === true) {
        setVerse(data);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    getVerse(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ alignSelf: "center" }}>
      {verse != null ? (
        <Container
          onPress={() => {
            navigation.navigate("Verse Of The Week", {
              verse: verse[0][1].split("--")[1],
            });
          }}
        >
          <ImageBackground
            source={require("../../assets/valley.jpg")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 15 }}
          >
            <VerseText adjustsFontSizeToFit numberOfLines={5}>
              {verse[0][1].split("--")[0]}
            </VerseText>
            <Verse>{verse[0][1].split("--")[1]}</Verse>
          </ImageBackground>
        </Container>
      ) : null}
    </View>
  );
};

export default function WidgetsDashboard({ navigation, setLoading, teacher }) {
  const AnotherContainer = styled.ScrollView``;
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    display: flex;
    justify-content: center;
    align-content: center;
  `;
  const ClearFix = styled.View`
    height: 150px;
  `;
  return (
    <Container>
      <AnotherContainer
        refreshControl={
          <RefreshControl
            tintColor="white"
            colors={["white"]}
            onRefresh={() => {
              setLoading(true);
            }}
          />
        }
        indicatorStyle="white"
      >
        <BibleVerseWidget navigation={navigation} />
        {teacher ? null : <GPAWidget navigation={navigation} />}
        {teacher ? null : <TeamColorWidget navigation={navigation} />}
        <NewsWidget navigation={navigation} />
        <EventsWidget navigation={navigation} />
        <TaskWidget navigation={navigation} />
        <FootNote showPullToRefresh={true} />
        <ClearFix />
      </AnotherContainer>
    </Container>
  );
}
