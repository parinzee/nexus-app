import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";

import Screen2 from "./Screen2";

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

function InitialScreen({ navigation }) {
	const Container = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
		align-content: center;
		justify-content: center;
	`;

	const InsideContainer = styled.View`
		justify-content: center;
		align-content: center;
	`;

	const Image = styled.Image`
		width: ${moderateScale(170)}px;
		height: ${moderateScale(170)}px;
		align-self: center;
	`;

	const HiText = styled.Text`
		text-align: center;
		font-size: ${moderateScale(45)}px;
		font-family: Now;
		color: white;
		margin-bottom: ${verticalScale(40)}px;
	`;

	const Description = styled.Text`
		text-align: center;
		font-size: ${moderateScale(20)}px;
		font-family: Now;
		color: white;
		margin-vertical: ${verticalScale(10)}px;
	`;

	const handlePress = () => {
		navigation.navigate("Screen2");
	};

	return (
		<Container>
			<InsideContainer>
				<Image source={require("../../../../assets/drawing.png")} />
				<HiText>Hey there!</HiText>
				<Description>
					Seems like this is your first time using the app! Please
					allow us to sign you up!
				</Description>
				<TouchableOpacity onPress={handlePress}>
					<FontAwesome5
						name="arrow-circle-right"
						size={50}
						color="white"
						style={{
							alignSelf: "center",
							marginBottom: verticalScale(100),
							marginTop: verticalScale(30),
						}}
					/>
				</TouchableOpacity>
			</InsideContainer>
		</Container>
	);
}

export default function FirstTimeSignOn() {
	const Stack = createStackNavigator();
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
					cardStyleInterpolator: forSlide,
				}}
			>
				<Stack.Screen name="Initial Screen" component={InitialScreen} />
				<Stack.Screen name="Screen2" component={Screen2} />
			</Stack.Navigator>
		</Container>
	);
}
