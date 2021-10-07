import React from "react";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function FootNote() {
	const Container = styled.View`
		align-self: center;
		align-content: center;
		justify-content: center;
		height: ${verticalScale(50)}px;
		margin-horizontal: auto;
		margin-top: ${verticalScale(40)}px;
		flex-direction: column;
	`;

	const Text = styled.Text`
		color: #818181;
		font-size: ${moderateScale(10)}px;
		text-align: center;
		margin-bottom: ${verticalScale(5)}px;
	`;

	return (
		<Container>
			<Text>BCIS Student Council'21</Text>
			<Text>สภานักเรียน'21 (นานาชาติคริสเตียนกรุงเทพ)</Text>
		</Container>
	);
}
