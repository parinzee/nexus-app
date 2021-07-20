import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function Screen1({ navigation }) {
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
		font-size: ${moderateScale(40)}px;
		font-family: Now;
		color: white;
		margin-bottom: ${verticalScale(35)}px;
	`;

	const Description = styled.Text`
		text-align: center;
		font-size: ${moderateScale(15)}px;
		font-family: Now;
		color: grey;
		margin-top: ${verticalScale(10)}px;
		margin-bottom: ${verticalScale(10)}px;
	`;

	const LogoContainer = styled.View`
		background-color: rgb(50, 50, 50);
		align-self: center;
		width: ${moderateScale(50) + 20}px;
		height: ${moderateScale(50) + 20}px;
		justify-content: center;
	`;
	const NexusLogo = styled.Image`
		max-width: ${moderateScale(50)}px;
		max-height: ${moderateScale(50)}px;
		margin-left: -${moderateScale(1)}px;
		align-self: center;
	`;

	const NexusText = styled.Text`
		color: white;
		font-family: Now;
		text-align: center;
		font-size: ${moderateScale(15)}px;
	`;
	const handlePress = () => {
		navigation.navigate("Screen2");
	};

	return (
		<Container>
			<InsideContainer>
				<LottieView
					source={require("../../assets/Welcome.json")}
					autoPlay
					loop={false}
					speed={0.7}
					style={{
						position: "relative",
						alignSelf: "center",
						width: moderateScale(300),
						height: moderateScale(300),
					}}
				/>
				<HiText>Hey there!</HiText>
				<Description>We are the BCIS Student Council</Description>
				<LogoContainer>
					<NexusLogo
						source={require("../../assets/nexus-logo.png")}
					/>
					<NexusText>Nexus</NexusText>
				</LogoContainer>
				<TouchableOpacity onPress={handlePress}>
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
