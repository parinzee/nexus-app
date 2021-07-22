import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Pages/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TeamColorWidget, NewsWidget, EventsWidget } from "./Widgets";

export default function Main({ navigation }) {
	const [name, setName] = useState();
	const [color, setColor] = useState();
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
		async function getData() {
			setName(JSON.parse(await AsyncStorage.getItem("@name")));
			setColor(JSON.parse(await AsyncStorage.getItem("@team")));
		}
		getData();
	}, []);
	const AnotherContainer = styled.ScrollView``;
	return (
		<OutContainer>
			<Header text={`Hello, ${name}`} fontSize="35" />
			<Container>
				<AnotherContainer>
					<TeamColorWidget teamColor={color} />
					<NewsWidget />
					<EventsWidget />
				</AnotherContainer>
			</Container>
		</OutContainer>
	);
}
