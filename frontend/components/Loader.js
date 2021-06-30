import React from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import styled from "styled-components/native";
import { CommonActions } from "@react-navigation/native";

export default function Loader({ navigation }) {
    const redirect = () => {
        setTimeout(() => {
            navigation.navigate("Home");
            navigation.dispatch((state) => {
                const routes = state.routes.filter((r) => r.name !== "Loading");

                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
        }, 1200);
    };
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;
    return (
        <Container>
            <Image
                source={require("../assets/intro.gif")}
                style={{ width: windowWidth, height: windowHeight }}
                onLoad={redirect}
            ></Image>
        </Container>
    );
}
