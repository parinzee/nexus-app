import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { scale, verticalScale } from "react-native-size-matters";

const Item = ({ eventName, eventDesc, mainColor }) => {
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        background-color: ${mainColor};
        border-radius: 20px;
        width: ${scale(295)}px;
        height: ${scale(100)}px;
        margin-top: ${verticalScale(22)}px;
        padding: 5px;
        margin-right: 20px;
        margin-left: 20px;
        padding-right: 10px;
    `;

    const TitleText = styled.Text`
        color: white;
        font-size: ${scale(27)}px;
        font-family: "OpenSans_800ExtraBold";
        margin-left: 10px;
    `;

    const SubtitleText = styled.Text`
        color: white;
        font-size: ${scale(15)}px;
        font-family: "OpenSans_800ExtraBold";
        margin-left: 10px;
    `;
    return (
        <Container>
            <TitleText>{eventName}</TitleText>
            <SubtitleText>{eventDesc}</SubtitleText>
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
        setItems(data.sort((a, b) => b[0] - a[0]));
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
                            eventName={item[1]}
                            eventDesc={item[2]}
                            mainColor={mainColor}
                        />
                    )}
                    keyExtractor={(entry) => entry[0].toString()}
                />
            ) : (
                <ActivityIndicator size="large" color={mainColor} />
            )}
        </ListContainer>
    );
}