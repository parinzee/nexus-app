import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from "react-native-size-matters";

const Item = ({ name, score, mainColor}) => {
    const Container = styled(LinearGradient).attrs({
        colors: [mainColor, "#404040"],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
    })`
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        width: ${scale(295)}px;
        height: ${scale(50)}px;
        margin-top: ${verticalScale(50)}px;
        padding: 5px;
        margin-right: 20px;
        margin-left: 20px;
        padding-right: 30px;
        padding-left: 30px;
        justify-content: space-between;
    `;

    const TitleText = styled.Text`
        color: white;
        font-size: ${scale(22)}px;
        font-family: "OpenSans_800ExtraBold";
        margin-left: 10px;
        align-self: center;
    `;

    const SubtitleText = styled.Text`
        color: white;
        font-size: ${scale(20)}px;
        font-family: "OpenSans_800ExtraBold";
        margin-left: 10px;
        align-self: center;
    `;
    return (
        <Container>
            <TitleText>{name}</TitleText>
            <SubtitleText>{score} pt</SubtitleText>
        </Container>
    );
};

export default function BottomContent({ uri, mainColor }) {
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const getEvents = async () => {
        const data = await axios.get(uri).then((response) => {
            return response.data;
        });
        let dataArray = [];
        for (let i = 1; i < 5; i++) {
                dataArray.push(data[0][i]) 
        }
        const colors =["RED", "BLUE", "YELLOW", "GREEN"];
        const realColors =["red", "#0066ff", "#e6e600", "#33cc33"];
        dataArray = dataArray.map((value, index) => {return {key: index, name: colors[index], score: value, color: realColors[index]}})
        console.log(dataArray)
        setItems(dataArray)
        setRefresh(false);
    };
    useEffect(() => {
        getEvents();
    }, [refresh]);

    const ListContainer = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-top: ${verticalScale(10)}px;
        flex: 1;
    `;

    return (
        <ListContainer>
            {refresh === false ? (
                <FlatList
                    data={items}
                    renderItem={({item}) => (
                        <Item
                            name={item.name}
                            score={item.score}
                            mainColor={item.color}
                        />
                    )}
                />
            ) : (
                <ActivityIndicator size="large" color={mainColor} />
            )}
        </ListContainer>
    );
}
