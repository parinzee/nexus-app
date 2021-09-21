import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";

export default function Tools({ navigation, route }) {
	try {
		const { navigateTo } = route.params;
		setTimeout(() => {
			navigation.navigate(navigateTo, { grade, honors });
		}, 400);
	} catch {}
	const [grade, setGrade] = useState(0);
	const [honors, setHonors] = useState(false);
	const Destinations = [
		{
			title: "Grade Calculator (4.00/4.50)",
			icon: (
				<FontAwesome5
					name="calculator"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Grade Calculator",
			gradient: false,
		},
		{
			title: "Popcat Event 🏆",
			icon: (
				<FontAwesome5
					name="cat"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "PopCat",
			gradient: true,
		},
		{
			title: "My Tasks",
			icon: (
				<FontAwesome5
					name="clipboard-list"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "My Tasks",
			gradient: false,
		},
		{
			title: "Tic Tac Toe",
			icon: (
				<FontAwesome5
					name="gamepad"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Tic Tac Toe",
			gradient: false,
		},
		{
			title: "Clicker (Stress Reliever)",
			icon: (
				<FontAwesome5
					name="hand-pointer"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Clicker",
			gradient: false,
		},
		{
			title: "Contact Us",
			icon: (
				<FontAwesome5
					name="question-circle"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Contact Us",
			gradient: false,
		},
	];
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: #121212;
	`;

	const BottomContainer = styled.View`
		margin-top: ${verticalScale(30)}px;
	`;

	useEffect(() => {
		async function getGrade() {
			setGrade(JSON.parse(await AsyncStorage.getItem("@grade")));
			setHonors(JSON.parse(await AsyncStorage.getItem("@honors")));
		}
		getGrade();
	}, []);
	return (
		<Container>
			<Header text="Tools" fontSize="35" />
			<BottomContainer>
				{Destinations.map(({ title, icon, destination, gradient }) => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate(destination, { grade, honors });
						}}
						key={title}
					>
						{gradient ? (
							<ListItem
								bottomDivider
								containerStyle={{
									backgroundColor: "#121212",
								}}
								linearGradientProps={{
									colors: ["#FF9800", "#F44336"],
									start: { x: 1, y: 0 },
									end: { x: 0.2, y: 0 },
								}}
								ViewComponent={LinearGradient}
							>
								{icon}
								<ListItem.Content>
									<ListItem.Title style={{ color: "white" }}>
										{title}
									</ListItem.Title>
								</ListItem.Content>
								<ListItem.Chevron />
							</ListItem>
						) : (
							<ListItem
								bottomDivider
								containerStyle={{
									backgroundColor: "#121212",
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
						)}
					</TouchableOpacity>
				))}
			</BottomContainer>
		</Container>
	);
}
