import React, { useState } from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Checkbox from "expo-checkbox";

export default function Screen2(navigation) {
	const { checked, setChecked } = useState(false);

	const Container = styled.View`
		flex: 1;
		background-color: rgb(25, 25, 25);
		align-content: center;
		justify-content: center;
	`;

	const PrivacyPolicyContainer = styled.ScrollView`
		border-color: white;
		border-radius: 20px;
		border-style: solid;
		border-width: 1px;
		height: ${verticalScale(200)}px;
		margin-top: ${verticalScale(20)}px;
		margin-horizontal: ${moderateScale(20)}px;
		padding: 10px;
	`;

	const PrivacyPolicyText = styled.Text`
		font-size: ${moderateScale(18)}px;
		font-family: System;
		color: white;
	`;

	const InsideContainer = styled.View`
		justify-content: center;
		align-content: center;
	`;

	const Description = styled.Text`
		text-align: center;
		font-size: ${moderateScale(20)}px;
		font-family: Now;
		color: white;
	`;

	const handlePress = () => {
		navigation.navigate("");
	};

	return (
		<Container>
			<InsideContainer>
				<LottieView
					source={require("../../assets/Agreement.json")}
					autoPlay
					loop={true}
					speed={0.7}
					style={{
						position: "relative",
						width: moderateScale(200),
						height: moderateScale(200),
						alignSelf: "center",
						marginBottom: -50,
					}}
				/>
				<Description>
					To allow us to provide you with the best services possible,
					please read through this privacy policy.
				</Description>
				<PrivacyPolicyContainer>
					<PrivacyPolicyText>jkajskdjakjdsk</PrivacyPolicyText>
				</PrivacyPolicyContainer>
				<TouchableOpacity onPress={handlePress}>
					<FontAwesome5
						name="arrow-circle-right"
						size={50}
						color="white"
						style={{
							alignSelf: "center",
							marginBottom: verticalScale(50),
							marginTop: verticalScale(30),
						}}
					/>
				</TouchableOpacity>
			</InsideContainer>
		</Container>
	);
}
