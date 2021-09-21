import React, { useState } from "react";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function PopCat() {
	const [clicked, setClicked] = useState(false);
	const image = [
		require("../../../assets/Cat-Closed.png"),
		require("../../../assets/Cat-Open.png"),
	];

	const Container = styled.View`
		flex: 1;
		background-color: #121212;
		justify-content: center;
		align-items: center;
	`;

	const Cat = styled.Image`
		height: ${moderateScale(400)}px;
		width: ${moderateScale(400)}px;
	`;

	return (
		<Container>
			<Cat source={clicked === false ? image[0] : image[1]} />
		</Container>
	);
}
