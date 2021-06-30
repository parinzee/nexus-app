import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content"
import axios from "axios"

export default function Events() {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        axios.get("https://nexussc.herokuapp.com/events/").then(res => console.log(res.data))
        
    }

    useEffect(() => getEvents())
    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;

    return (
        <Container>
            <Header
                imagePath={require("../../../assets/typingMan.gif")}
                text={`UPCOMING${"\n"}EVENTS`}
                fontSize="25"
                imageLeft={false}
                margin="20"
            />
            
        </Container>
    );
}
