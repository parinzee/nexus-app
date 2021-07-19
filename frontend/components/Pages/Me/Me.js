import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";

import FirstTimeSignOn from "./Pages/FirstTimeSignOn";

const Stack = createStackNavigator();

export default function Me() {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(25, 25, 25);
	`;

	return (
		<Container>
			<Stack.Navigator
				detachInactiveScreens={true}
				screenOptions={{
					headerStyle: {
						backgroundColor: "rgb(25,25,25)",
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
					headerTitleStyle: {
						color: "rgb(25,25,25)",
					},
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="First Time Sign On"
					component={FirstTimeSignOn}
				/>
			</Stack.Navigator>
		</Container>
	);
}
