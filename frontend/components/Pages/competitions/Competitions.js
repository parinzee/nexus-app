import React from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";

export default function Competitions({}) {
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;

    return (
        <Container>
            <Header
                imagePath={require("../../../assets/AGuy.gif")}
                text={`UPCOMING${"\n"}ACTIVITIES`}
                fontSize="28"
                imageLeft={true}
                margin="20"
            />
            <Content uri="http://nexussc.herokuapp.com/competitions/"  mainColor="#ff9151"/>
        </Container>
    );
}
