import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { moderateScale } from "react-native-size-matters";
import { Audio } from "expo-av";

export default function PopCat() {
	const [clicked, setClicked] = useState(false);
	const [sound, setSound] = useState(new Audio.Sound());
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

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require("../../../assets/click.mp3")
		);
		sound.playAsync();
	}
	const onPress = async () => {
		setClicked(true);
		playSound();
		setTimeout(() => {
			setClicked(false);
		}, 40);
	};

	const onLongPress = async () => {
		setClicked(true);
		playSound();
		setTimeout(() => {
			setClicked(false);
		}, 400);
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
