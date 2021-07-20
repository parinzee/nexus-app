import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Pages/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function Main({ navigation }) {
	const [name, setName] = useState();
	const OutContainer = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		display: flex;
	`;
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		display: flex;
		justify-content: center;
		align-content: center;
	`;

	useEffect(() => {
		async function getName() {
			setName(JSON.parse(await AsyncStorage.getItem("@name")));
		}
		getName();
	}, []);
	const AnotherContainer = styled.View``;
	return (
		<OutContainer>
			<Header text={`Hello, ${name}`} fontSize="35" />
			<Container>
				{/* TODO: Put in the summaries.*/}
				<AnotherContainer></AnotherContainer>
			</Container>
		</OutContainer>
	);
}
