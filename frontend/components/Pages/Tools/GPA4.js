import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Standards = () => {
	const HTML = require("../../../assets/Standards.html");
	const handleGPA = async (grade) => {
		await AsyncStorage.setItem("@GPA", JSON.stringify(grade));
	};
	return (
		<WebView
			style={{ flex: 1 }}
			source={HTML}
			onMessage={(event) => handleGPA(event.nativeEvent.data)}
		/>
	);
};

export default function GPA4({ route }) {
	const [honors, setHonors] = useState();
	const { grade } = route.params;
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
	`;

	useEffect(() => {
		const CheckStandards = async () => {
			const value = await AsyncStorage.getItem("@honors");
			if (value === null) {
				Alert.alert(
					"Are you in honors?",
					"We need this to accurately determine your grade.",
					[
						{
							text: "Yes",
							onPress: async () => {
								await AsyncStorage.setItem(
									"@honors",
									JSON.stringify(true)
								);
								setHonors(true);
							},
						},
						{
							text: "No",
							onPress: async () => {
								await AsyncStorage.setItem(
									"@honors",
									JSON.stringify(false)
								);
								setHonors(false);
							},
						},
					]
				);
			} else {
				return JSON.parse(value);
			}
		};

		CheckStandards();
	}, [honors]);
	return (
		<Container>
			{grade < 9 ? (
				<Standards />
			) : honors === false ? (
				<Standards />
			) : (
				<Container />
			)}
		</Container>
	);
}
