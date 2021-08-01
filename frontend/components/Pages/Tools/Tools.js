import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../Header";
import { verticalScale, moderateScale } from "react-native-size-matters";

export default function Tools({ navigation, route }) {
    try {
		const {navigateTo} = route.params
		setTimeout(() => {navigation.navigate(navigateTo, { grade, honors })}, 400)
    } catch {}
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

    const resetData = () => {
        AsyncStorage.clear();
        Alert.alert("Data has been reset", "Please re-launch the app.", [{text: "Ok"}])
    }

    const handlePress = () => {
        Alert.alert("Are you sure?", "Are you absolutely sure you want to erase all data?", [{text: "Yes", onPress: resetData}, {text: "No"}])
    }

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
							{navigation.navigate(destination, { grade, honors })}
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
          <Button title="  Reset all data" containerStyle={{width: moderateScale(150), marginTop: verticalScale(100), alignSelf: "center", borderWidth: 1, borderColor: "white"}}
          	icon={<FontAwesome5 name="exclamation-triangle" size={25} color="white"/>}
            buttonStyle={{backgroundColor: "#F8485E"}}
          	onPress={handlePress}
        />
		</Container>
	);
}
