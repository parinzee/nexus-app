import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";

const Stack = createStackNavigator();

const Tools1 = () => {
	const Destinations = [
		{
			title: "Calculate Subject Grade to 4.0",
			icon: <FontAwesome5 name="calculator" size={24} color="black" />,
		},
	];
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(35, 35, 35);
	`;

	return (
		<Container>
			<Header text="Tools" fontSize="35" />
		</Container>
	);
};
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
			>
				<Stack.Screen name="Tools" component={Tools1} />
			</Stack.Navigator>
		</Container>
	);
}
