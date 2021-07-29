import React from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";

export default function Events({}) {
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;

	return (
		<Container>
			<Header text={`News`} fontSize="35" />
			<Content
				uri="http://nbcis.herokuapp.com/announcements/"
				mainColor="#CC9B6D"
				type="news"
			/>
		</Container>
	);
}
