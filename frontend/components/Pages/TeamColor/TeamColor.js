import React, { useEffect } from "react";
import styled from "styled-components/native";
import Header from "../Header";
import { LogBox } from "react-native";
import Scores from "./Scores";
import Content from "../Content";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function Activities({}) {
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		justify-content: center;
		align-content: center;
	`;

	const AnotherContainer = styled.ScrollView``;

	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	return (
		<Container>
			<Header text="Team Colors" fontSize="45" />
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
