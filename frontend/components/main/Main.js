import React from "react";
import styled from "styled-components/native";
import Header from "./Header";
import { TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function Main({ navigation }) {
	const OutContainer = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
		display: flex;
	`;
	const Container = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
		display: flex;
		justify-content: center;
		align-content: center;
	`;

	const AnotherContainer = styled.View``;
	return (
		<OutContainer>
			<TouchableOpacity activeOpacity="1" onPress={() => handlePress()}>
				<Header />
			</TouchableOpacity>
			<Container>
				{/* TODO: Put in the summaries.*/}
				<AnotherContainer></AnotherContainer>
			</Container>
		</OutContainer>
	);
}
