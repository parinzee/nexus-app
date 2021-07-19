import React from "react";
import styled from "styled-components/native";
import Header from "../Header";
import Content from "./Content";

export default function Competitions({}) {
	const Container = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
	`;

	return (
		<Container>
			<Header
				imagePath={require("../../../assets/teacher.gif")}
				text={`TEAM COLOR${"\n"}SCORES`}
				fontSize="25"
				imageLeft={true}
				margin="22"
			/>
		</Container>
	);
}
