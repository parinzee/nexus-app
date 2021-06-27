import React from "react";
import styled from "styled-components/native";
import Header from "./Header";

export default function Main() {
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
        color: white;
        margin: 0;
    `;
    return (
        <Container>
            <Header />
        </Container>
    );
}
