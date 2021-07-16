import React from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";

export default function Activities({ }) {
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;

    return (
        <Container>
            <Header
                imagePath={require("../../../assets/AGuy.gif")}
                text={`UPCOMING${"\n"}EVENTS`}
                fontSize="28"
                imageLeft={false}
                margin="28"
            />
            <Content uri="http://nexussc.herokuapp.com/events/" mainColor="#5071f6" />
        </Container>
    );
}
