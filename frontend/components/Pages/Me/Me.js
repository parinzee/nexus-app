import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Me() {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(35, 35, 35);
	`;

	return (
		<Container>
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
			></Stack.Navigator>
		</Container>
	);
}
