import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { moderateScale, verticalScale } from "react-native-size-matters";

const Item = ({ index, name, score, mainColor }) => {
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
    background-color: ${mainColor};
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
};

export default function BottomContent({ uri, mainColor }) {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(false);

  const getEvents = async () => {
    const data = await axios
      .get(uri)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
    if (data === false) {
      setError(true);
      setRefresh(false);
    } else {
      let dataArray = [];
      for (let i = 1; i < 5; i++) {
        dataArray.push(data[0][i]);
      }
      const colors = ["RED", "BLUE", "YELLOW", "GREEN"];
      const realColors = ["#D35D6E", "#87A7B3", "#FFCF64", "#83B582"];
      dataArray = dataArray.map((value, index) => {
        return {
          key: index,
          name: `${colors[index]} TEAM`,
          score: value,
          color: realColors[index],
        };
      });
      dataArray.sort((a, b) => {
        if (parseInt(a.score) > parseInt(b.score)) {
          return 1;
        } else if (parseInt(a.score) < parseInt(b.score)) {
          return -1;
        } else {
          return 0;
        }
      });
      setItems(dataArray.reverse());
      setRefresh(false);
    }
  };
  useEffect(() => {
    getEvents();
  }, [refresh]);

  const ModalContainer = styled.TouchableOpacity`
    align-content: center;
    justify-content: center;
    align-items: center;
  `;

  const InnerContainer = styled.View`
    background-color: #121212;
    display: flex;
    flex-direction: column;
    border-width: 1px;
    border-color: white;
    border-radius: 25px;
    width: 30%;
    height: 17%;
    padding: 10px;
  `;

  const ModalTitle = styled.Text`
    color: white;
    font-family: System;
    text-align: center;
    font-size: ${moderateScale(25)}px;
    margin-bottom: 10px;
  `;

  const ModalText = styled.Text`
    text-align: center;
    color: white;
    font-family: System;
    font-size: ${moderateScale(13)}px;
  `;

  const ListContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-top: ${verticalScale(20)}px;
  `;

  return (
    <ListContainer>
      {refresh === false ? (
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <Item
              index={index + 1}
              name={item.name}
              score={item.score}
              mainColor={item.color}
            />
          )}
          keyExtractor={(items, index) => {
            return index.toString();
          }}
          scrollEnabled={false}
        />
      ) : (
        <ModalText></ModalText>
      )}
    </ListContainer>
  );
}
