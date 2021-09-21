import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function PopCat() {
	const [clicked, setClicked] = useState(false);
	const imgsrc = [
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

	const onPress = () => {
		setClicked(true);
		setTimeout(() => {
			setClicked(false);
		}, 30);
	};

	const onLongPress = () => {
		setClicked(true);
		setTimeout(() => {
			setClicked(false);
		}, 500);
	};

	return (
		<Container>
			<Pressable
				onPress={onPress}
				onLongPress={onLongPress}
				delayLongPress={200}
			>
				<Cat source={clicked === false ? imgsrc[0] : imgsrc[1]} />
			</Pressable>
		</Container>
	);
}
