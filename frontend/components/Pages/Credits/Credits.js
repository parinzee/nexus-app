import React from "react";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Credits() {
	const Container = styled.View`
		flex: 1;
		flex-direction: column;
		background-color: #121212;
	`;
	const Title = styled.Text`
		color: white;
		font-family: System;
		font-size: ${moderateScale(20)}px;
		margin-top: ${verticalScale(15)}px;
		margin-bottom: ${verticalScale(10)}px;
		margin-left: 20px;
	`;

	const InfoTextContainer = styled.View`
		flex-direction: row;
		margin-top: ${verticalScale(20)}px;
		border-bottom-color: grey;
		border-bottom-width: 0.2px;
		margin-left: 20px;
		margin-right: 20px;
		justify-content: space-between;
	`;

	const FrontText = styled.Text`
		color: grey;
		font-family: System;
		font-size: ${moderateScale(13)}px;
	`;

	const BackText = styled.Text`
		color: white;
		font-family: System;
		font-size: ${moderateScale(13)}px;
	`;
	return (
		<Container>
			<Title>Information</Title>
			<InfoTextContainer>
				<FrontText>Publisher</FrontText>
				<BackText>NEXUS Student Council</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>Copyright</FrontText>
				<BackText>© Parinthapat Pengpun 2021-2022</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>App Developer</FrontText>
				<BackText>Parinthapat Pengpun</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>Version</FrontText>
				<BackText>2.0.0</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>Created</FrontText>
				<BackText>June 20 2021</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>Last Updated</FrontText>
				<BackText>September 27 2021</BackText>
			</InfoTextContainer>
			<InfoTextContainer>
				<FrontText>Special Thanks</FrontText>
				<BackText>NEXUS Members</BackText>
			</InfoTextContainer>
			<Button
				title="Reset Data"
				type="outline"
				onPress={() => AsyncStorage.clear()}
				containerStyle={{ marginTop: 100, paddingHorizontal: 20 }}
			/>
		</Container>
	);
}
