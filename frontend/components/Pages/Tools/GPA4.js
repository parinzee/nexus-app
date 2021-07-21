import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleGPA = async (grade) => {
	console.log(grade);
	// await AsyncStorage.setItem("@GPA", JSON.stringify(grade));
};
const Standards = () => {
	const HTML = require("../../../assets/Standards.html");
	return (
		<WebView
			style={{ flex: 1 }}
			source={HTML}
			onMessage={(event) => handleGPA(event.nativeEvent.data)}
		/>
	);
};

const Honors = () => {
	const HTML = require("../../../assets/Honors.html");
	return (
		<WebView
			style={{ flex: 1 }}
			source={HTML}
			onMessage={(event) => handleGPA(event.nativeEvent.data)}
		/>
	);
};

export default function GPA4({ route }) {
	const { grade, honors } = route.params;
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
	`;
	if (grade < 9) {
		return (
			<Container>
				<Standards />
			</Container>
		);
	} else if (honors === true) {
		return (
			<Container>
				<Honors />
			</Container>
		);
	} else {
		return (
			<Container>
				<Standards />
			</Container>
		);
	}
}
