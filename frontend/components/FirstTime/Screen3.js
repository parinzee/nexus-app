import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Input } from "react-native-elements";

export default function Screen3() {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		background-color: rgb(25, 25, 25);
	`;

	const InsideContainer = styled.View`
		justify-content: center;
		align-content: center;
	`;

	const HiText = styled.Text`
		text-align: center;
		font-size: ${moderateScale(45)}px;
		font-family: Now;
		color: white;
		margin-bottom: ${verticalScale(20)}px;
	`;

	const Description = styled.Text`
		text-align: center;
		font-size: ${moderateScale(20)}px;
		font-family: Now;
		color: white;
	`;

	return (
		<Container>
			<InsideContainer>
				<LottieView
					source={require("../../assets/ID.json")}
					autoPlay
					loop={true}
					speed={0.7}
					style={{
						position: "relative",
						width: moderateScale(200),
						height: moderateScale(200),
						alignSelf: "center",
					}}
				/>
				<HiText>Almost Done!</HiText>
				<Description>
					To personalize your experience, we would like to ask you for
					a few things! (Name, team color, and grade)
				</Description>
				<TouchableOpacity>
					<FontAwesome5
						name="arrow-circle-right"
						size={50}
						color="white"
						style={{
							alignSelf: "center",
							marginTop: verticalScale(30),
						}}
					/>
				</TouchableOpacity>
			</InsideContainer>
		</Container>
	);
}
