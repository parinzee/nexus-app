import React from "react";
import styled from "styled-components/native";
import Header from "../Header";

export default function Me() {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(25, 25, 25);
	`;

	return (
		<Container>
			<Header text="About Me" fontSize="50" />
		</Container>
	);
}
