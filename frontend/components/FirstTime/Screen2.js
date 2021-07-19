import React from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Screen2(navigation) {
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
		navigation.navigate("");
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
