import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";

export default function Tools({ navigation }) {
	const [grade, setGrade] = useState(0);
	const [honors, setHonors] = useState(false);
	const Destinations = [
		{
			title: "GPA Calculator (4.00/4.50)",
			icon: (
				<FontAwesome5
					name="calculator"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Grade Calculator",
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
		},
		{
			title: "Stress Reliever (Clicker)",
			icon: (
				<FontAwesome5
					name="hand-pointer"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Clicker",
		},
		{
			title: "Stress Reliever (Tic Tac Toe)",
			icon: (
				<FontAwesome5
					name="gamepad"
					size={moderateScale(24)}
					color="white"
				/>
			),
			destination: "Tic Tac Toe",
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
        }
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
				{Destinations.map(({ title, icon, destination }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(destination, { grade, honors })
						}
						key={title}
					>
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
					</TouchableOpacity>
				))}
			</BottomContainer>
		</Container>
	);
}
