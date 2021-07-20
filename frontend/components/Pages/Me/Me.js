import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Header";

const Stack = createStackNavigator();

const Me1 = () => {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(35, 35, 35);
	`;

	return (
		<Container>
			<Header text="Me" fontSize="50" />
		</Container>
	);
};
export default function Me() {
	return (
		<Stack.Navigator
			detachInactiveScreens={true}
			screenOptions={{
				headerStyle: {
					backgroundColor: "rgb(35,35,35)",
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
				},
				headerTitleStyle: {
					color: "rgb(35,35,35)",
				},
				headerShown: false,
			}}
		>
			<Stack.Screen name="Me" component={Me1} />
		</Stack.Navigator>
	);
}
