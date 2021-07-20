import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";

const Stack = createStackNavigator();

const Tools1 = ({ navigation }) => {
	const Destinations = [
		{
			title: "Calculate Subject Grades to 4.0",
			icon: (
				<FontAwesome5
					name="calculator"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "GPA4",
		},
		{
			title: "Calclate Grade of One Subject",
			icon: (
				<FontAwesome5
					name="divide"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "GPA1",
		},
		{
			title: "My notes",
			icon: (
				<FontAwesome5
					name="clipboard-list"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Todo",
		},
	];
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: rgb(35, 35, 35);
	`;

	const BottomContainer = styled.View`
		margin-top: ${verticalScale(30)}px;
	`;
	return (
		<Container>
			<Header text="Tools" fontSize="35" />
			<BottomContainer>
				{Destinations.map(({ title, icon }, index) => (
					<TouchableOpacity>
						<ListItem
							key={index}
							bottomDivider
							containerStyle={{
								backgroundColor: "rgb(25,25,25)",
							}}
						>
							{icon}
							<ListItem.Content>
								<ListItem.Title style={{ color: "white" }}>
									{title}
								</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron />
						</ListItem>
					</TouchableOpacity>
				))}
			</BottomContainer>
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
