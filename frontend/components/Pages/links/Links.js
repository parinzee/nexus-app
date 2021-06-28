import React from "react";
import styled from "styled-components/native";
import Header from "../Header";

export default function Links() {
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
        margin: 0;
    `;
    return (
        <Container>
            <Header
                imagePath={require("../../../assets/sleepingMan.gif")}
                text="LINKS"
                fontSize="35"
                imageLeft={true}
            />
        </Container>
    );
}
