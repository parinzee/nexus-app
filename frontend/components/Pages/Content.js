import styled from "styled-components/native";
import React from "react";

const Item = ({ eventName, eventDesc }) => {
    const Container = styled.View`
        display: flex;
        flex-direction: row;
        background-color: #fccf04;
        border-radius: 20px;
        width: ${scale(295)}px;
        height: ${scale(100)}px;
        margin-top: ${verticalScale(22)}px;
        padding: 5px;
        box-shadow: 0px 0px 10px #fccf04;
        margin-right: 20px;
        margin-left: 20px;
    `;

    const TitleText = styled.Text`
        color: white;
        font-size: ${scale(20)}px;
        font-family: "OpenSans_800ExtraBold";
        align-self: center;
        margin-left: 10px;
    `;

    const SubtitleText = styled.Text`
        color: white;
        font-size: ${scale(12)}px;
        font-family: "OpenSans_800ExtraBold";
        align-self: center;
        margin-left: 10px;
    `;
    return (
        <Container>
            <TitleText>{eventName}</TitleText>
            <SubtitleText>{eventDesc}</SubtitleText>
        </Container>
    );
};

export default function BottomContent({ content }) {
    const ListContainer = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-top: ${verticalScale(10)}px;
        width: ${windowWidth}px;
        height: ${windowHeight}px;
    `;

    return <ListContainer></ListContainer>;
}
