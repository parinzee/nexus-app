import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Pages/Header";
import WidgetsDashboard from "./Widgets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main({ navigation }) {
	const [name, setName] = useState();
	const OutContainer = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		display: flex;
	`;

	useEffect(() => {
		async function getData() {
			setName(JSON.parse(await AsyncStorage.getItem("@name")));
		}
		getData();
	}, []);
	return (
		<OutContainer>
			<Header text={`Hello, ${name}`} fontSize="35" />
			<WidgetsDashboard />
		</OutContainer>
	);
}
