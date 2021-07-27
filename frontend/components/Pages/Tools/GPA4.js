import React, { useState } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { Button } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, verticalScale } from "react-native-size-matters";

const handleGPA = async (grade) => {
	await AsyncStorage.setItem("@GPA", JSON.stringify(grade));
};
const Standards = () => {
	const HTML = require("../../../assets/Standards.html");
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;

	return (
		<WebView
			style={{ flex: 1, backgroundColor: "#121212" }}
			source={HTML}
			onMessage={(event) => handleGPA(event.nativeEvent.data)}
			startInLoadingState={true}
			renderLoading={() => <Container />}
		/>
	);
};

const Honors = () => {
	const HTML = require("../../../assets/Honors.html");
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;
	return (
		<WebView
			style={{ flex: 1, backgroundColor: "#121212" }}
			source={HTML}
			startInLoadingState={true}
			renderLoading={() => <Container />}
		/>
	);
};

export default function GPA4({ route }) {
	const { grade, honors } = route.params;
	const [honorsManual, setHonorsManual] = useState(null);
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;

	const AnotherContainer = styled.View`
		flex: 1;
		background-color: #121212;
		justify-content: center;
		align-items: center;
	`;

	const InnerChooser = styled.View`
		justify-content: center;
		margin-horizontal: ${moderateScale(40)}px;
	`;

	const AskText = styled.Text`
		font-family: System;
		font-size: ${moderateScale(25)}px;
		color: white;
		text-align: center;
		margin-bottom: ${verticalScale(30)}px;
	`;

	if (grade < 9 && grade != null) {
		return (
			<Container>
				<Standards />
			</Container>
		);
	} else if (honors === true || honorsManual === true) {
		return (
			<Container>
				<Honors />
			</Container>
		);
	} else if ((honors === false && grade != null) || honorsManual === false) {
		return (
			<Container>
				<Standards />
			</Container>
		);
	} else {
		return (
			<AnotherContainer>
				<InnerChooser>
					<AskText>Which scale do you want to use?</AskText>
					<Button
						title="Standards Scale"
						containerStyle={{ marginBottom: verticalScale(20) }}
						buttonStyle={{
							backgroundColor: "#f2e1c1",
						}}
						titleStyle={{
							color: "black",
						}}
						onPress={() => setHonorsManual(true)}
					/>
					<Button
						title="Honors Scale"
						buttonStyle={{
							backgroundColor: "#f2e1c1",
						}}
						titleStyle={{
							color: "black",
						}}
						onPress={() => setHonorsManual(false)}
					/>
				</InnerChooser>
			</AnotherContainer>
		);
	}
}
