import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { scale, verticalScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function MenuSelector({
    imagePath,
    text,
    backgroundColor,
    fontSize,
    imageLeft,
    margin,
}) {
    const MenuImage = styled.Image`
        height: ${scale(85)}px;
        width: ${scale(155)}px;
    `;
    const Container = styled.View`
        background-color: ${backgroundColor};
        margin-top: ${verticalScale(27)}px;
        display: flex;
        width: ${scale(295)}px;
        height: ${scale(85)}px;
        flex-direction: ${imageLeft ? "row" : "row-reverse"};
        border-radius: 16px;
    `;

    const MenuText = styled.Text`
        font-family: "OpenSans_800ExtraBold";
        color: white;
        align-self: center;
        ${margin && `margin: ${margin};`}
        font-size: ${scale(parseInt(fontSize))}px;
    `;

    return (
        <Container>
            <MenuImage source={imagePath} />
            <MenuText>{text}</MenuText>
        </Container>
    );
}

export default function Main() {
    const [updatedState, setUpdatedState] = useState(false);
    const navigation = useNavigation();

    const getUpdated = async () => {
        const localUpdated = await AsyncStorage.getItem("@localUpdated");
        const lastEdited = await axios
            .get("https://nexussc.herokuapp.com/lastEdited")
            .then((res) => res.data)
            .catch(() => setUpdatedState(false));
        if (lastEdited != localUpdated) {
            setUpdatedState(true);
            await AsyncStorage.setItem("@localUpdated", lastEdited);
        } else {
            setUpdatedState(true);
        }
    };

    useEffect(() => {getUpdated()});
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    `;
    return (
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate("Links")}>
                <MenuSelector
                    imagePath={require("../../assets/sleepingMan.gif")}
                    text="LINKS"
                    backgroundColor="#fccf04"
                    fontSize="25"
                    imageLeft={true}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                <MenuSelector
                    imagePath={require("../../assets/typingMan.gif")}
                    text={`UPCOMING ${"\n"}EVENTS`}
                    backgroundColor="#ff5758"
                    fontSize="22"
                    imageLeft={false}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <MenuSelector
                    imagePath={require("../../assets/AGuy.gif")}
                    text={`UPCOMING ${"\n"}ACTIVITIES`}
                    backgroundColor="#5071f6"
                    fontSize="22"
                    imageLeft={true}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <MenuSelector
                    imagePath={require("../../assets/teacher.gif")}
                    text={`QUARTERLY${"\n"}COMPETITIONS`}
                    backgroundColor="#ff9151"
                    fontSize="18"
                    imageLeft={false}
                />
            </TouchableOpacity>
        </Container>
    );
}
