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
			title: "Calculate Grades to 4.00/4.50",
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
			destination: "My Notes",
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
}
