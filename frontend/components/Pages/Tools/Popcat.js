import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { moderateScale } from "react-native-size-matters";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PopCat() {
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
		justify-content: center;
		align-items: center;
	`;

	return (
		<Container>
			<Cat />
		</Container>
	);
}

function Cat() {
	const [clicked, setClicked] = useState(false);
	const [clicks, setClicks] = useState(0);
	const imgsrc = [
		require("../../../assets/Cat-Closed.png"),
		require("../../../assets/Cat-Open.png"),
	];

	const Cat = styled.Image`
		height: ${moderateScale(400)}px;
		width: ${moderateScale(400)}px;
	`;

	const Pressable = styled.Pressable`
		display: flex;
		flex-direction: column;
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
			setClicks(clicks + 1);
		}, 40);
	};

	const onLongPress = async () => {
		setClicked(true);
		playSound();
		setTimeout(() => {
			setClicked(false);
			setClicks(clicks + 1);
		}, 400);
	};

	const loadCounts = async () => {
		const counts = JSON.parse(await AsyncStorage.getItem("@popcat"));
		if (counts != null) {
			setClicks(counts);
		}
	};

	useEffect(() => {
		loadCounts();
	}, []);

	return (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			delayLongPress={200}
		>
			<Counter clicks={clicks} setClicks={setClicks} />
			<Cat source={clicked === false ? imgsrc[0] : imgsrc[1]} />
		</Pressable>
	);
}

function Counter({ clicks }) {
	const CounterText = styled.Text`
		font-family: System;
		font-size: ${moderateScale(50)}px;
		color: white;
		text-align: center;
		margin-top: -100px;
		margin-bottom: -20px;
	`;

	const updateCounts = async () => {
		if (clicks != 0) {
			await AsyncStorage.setItem("@popcat", JSON.stringify(clicks));
		}
	};

	useEffect(() => {
		updateCounts();
	}, [clicks]);

	return <CounterText>{clicks}</CounterText>;
}
