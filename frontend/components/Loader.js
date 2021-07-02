import React, {useEffect} from "react";
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
        }, 1);
    };

    useEffect(() => redirect())
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;
    return (
        <Container>
        </Container>
    );
}
