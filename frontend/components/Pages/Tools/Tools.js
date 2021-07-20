import React, { useEffect, useState } from "react";
import { TouchableOpacity, Animated } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";

const Stack = createStackNavigator();

export default function Tools1({ navigation }) {
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
			destination: "Calculate to 4.0",
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
	}, []);
	return (
		<Container>
			<Header text="Tools" fontSize="35" />
			<BottomContainer>
				{grade < 7
					? Destinations.map(
							({ title, icon, destination }, index) => (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(destination, {})
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
}
