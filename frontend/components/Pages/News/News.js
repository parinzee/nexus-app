import React from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";

export default function Events({}) {
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
	`;

	return (
		<Container>
			<Header text={`NEWS`} fontSize="50" />
			<Content
				uri="http://nexussc.herokuapp.com/announcements/"
				mainColor="#ff5758"
			/>
		</Container>
	);
}
