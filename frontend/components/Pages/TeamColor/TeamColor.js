import React, { useEffect } from "react";
import styled from "styled-components/native";
import Header from "../Header";
import { LogBox } from "react-native";
import Scores from "./Scores";
import Content from "../Content";

export default function Activities({}) {
	const Container = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
		justify-content: center;
		align-content: center;
	`;

	const AnotherContainer = styled.ScrollView``;

	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	return (
		<Container>
			<AnotherContainer>
				<Scores
					uri="http://nexussc.herokuapp.com/scores/"
					mainColor="#ff9151"
				/>
				<Content
					uri="http://nexussc.herokuapp.com/events/"
					mainColor="#5071f6"
				/>
			</AnotherContainer>
		</Container>
	);
}
