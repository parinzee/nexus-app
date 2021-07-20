import React, { useState } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
	const { grade } = route.params;
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
	`;

	return <Container>{grade < 9 ? <Standards /> : <Standards />}</Container>;
}
