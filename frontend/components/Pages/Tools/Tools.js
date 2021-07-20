import React, { useEffect, useState } from "react";
import { TouchableOpacity, Animated } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";
import GPA4 from "./GPA4";
import { verticalScale, moderateScale } from "react-native-size-matters";

const Stack = createStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: "clamp",
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: "clamp",
			  })
			: 0
	);

	return {
		cardStyle: {
			transform: [
				{
					translateX: Animated.multiply(
						progress.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								screen.width, // Focused, but offscreen in the beginning
								0, // Fully focused
								screen.width * -0.3, // Fully unfocused
							],
							extrapolate: "clamp",
						}),
						inverted
					),
				},
			],
		},
	};
};

const Tools1 = ({ navigation }) => {
	const [grade, setGrade] = useState(0);
	const DestinationsHigh = [
		{
			title: "Calculate Grades to 4.0",
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
	const Destinations = [
		{
			title: "Calculate Grades to 100",
			icon: (
				<FontAwesome5
					name="calculator"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "GPA100",
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

	useEffect(() => {
		async function getGrade() {
			setGrade(await AsyncStorage.getItem("@grade"));
		}
		getGrade();
	}, [grade]);
	return (
		<Container>
			<Header text="Tools" fontSize="35" />
			<BottomContainer>
				{grade < 7
					? Destinations.map(
							({ title, icon, destination }, index) => (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(destination)
									}
								>
									<ListItem
										key={index}
										bottomDivider
										containerStyle={{
											backgroundColor: "rgb(25,25,25)",
										}}
									>
										{icon}
										<ListItem.Content>
											<ListItem.Title
												style={{ color: "white" }}
											>
												{title}
											</ListItem.Title>
										</ListItem.Content>
										<ListItem.Chevron />
									</ListItem>
								</TouchableOpacity>
							)
					  )
					: DestinationsHigh.map(
							({ title, icon, destination }, index) => (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(destination)
									}
								>
									<ListItem
										key={index}
										bottomDivider
										containerStyle={{
											backgroundColor: "rgb(25,25,25)",
										}}
									>
										{icon}
										<ListItem.Content>
											<ListItem.Title
												style={{ color: "white" }}
											>
												{title}
											</ListItem.Title>
										</ListItem.Content>
										<ListItem.Chevron />
									</ListItem>
								</TouchableOpacity>
							)
					  )}
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
					cardStyleInterpolator: forSlide,
				}}
			>
				<Stack.Screen name="Tools" component={Tools1} />
				<Stack.Screen name="Calulate to 4.0" component={GPA4} />
			</Stack.Navigator>
		</Container>
	);
}
