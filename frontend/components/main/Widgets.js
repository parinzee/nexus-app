import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { View } from "react-native";
import axios from "axios";

export const TeamColorWidget = ({ teamColor }) => {
	const [item, setItem] = useState(null);
	const [refresh, setRefresh] = useState(true);
	const realColors = ["red", "#0066ff", "#e6e600", "#33cc33"];
	const mainColor =
		teamColor === "red"
			? realColors[0]
			: teamColor === "blue"
			? realColors[1]
			: teamColor === "yellow"
			? realColors[2]
			: realColors[3];

	const Container = styled(LinearGradient).attrs({
		colors: [mainColor, "grey"],
		start: { x: 0, y: 0 },
		end: { x: 1, y: 0 },
	})`
		display: flex;
		border-radius: 10px;
		width: ${moderateScale(296)}px;
		height: ${moderateScale(46)}px;
		margin-top: ${verticalScale(14)}px;
		padding: 5px;
		margin-right: 20px;
		margin-left: 20px;
		justify-content: center;
		align-content: center;
		align-self: center;
	`;

	const InnerContainer = styled.View`
		display: flex;
		flex-direction: row;
		border-radius: 10px;
		width: ${moderateScale(290)}px;
		height: ${moderateScale(40)}px;
		background-color: rgb(25, 25, 25);
		padding: 5px;
		padding-right: 30px;
		padding-left: 10px;
		align-self: center;
		justify-content: space-between;
	`;

	const TitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(19)}px;
		font-family: "OpenSans_800ExtraBold";
		margin-left: 10px;
		align-self: center;
	`;

	const SubtitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(17)}px;
		font-family: "OpenSans_800ExtraBold";
		margin-left: 10px;
		align-self: center;
	`;

	const getEvents = async (isMounted) => {
		const data = await axios
			.get("http://nexussc.herokuapp.com/scores/")
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return false;
			});
		if (data != false) {
			let dataArray = [];
			for (let i = 1; i < 5; i++) {
				dataArray.push(data[0][i]);
			}
			const colors = ["RED", "BLUE", "YELLOW", "GREEN"];
			dataArray = dataArray.map((value, index) => {
				return {
					key: index,
					name: colors[index],
					score: value,
					color: realColors[index],
				};
			});
			if (teamColor === "red") {
				setItem(dataArray[0]);
			} else if (teamColor === "blue") {
				setItem(dataArray[1]);
			} else if (teamColor === "yellow") {
				setItem(dataArray[2]);
			} else {
				setItem(dataArray[3]);
			}
			if (isMounted === true) {
				setRefresh(false);
			}
		}
	};

	useEffect(() => {
		let isMounted = true;
		getEvents(isMounted);
	}, []);

	return (
		<View style={{ justifyContent: "center", alignContent: "center" }}>
			{refresh === false ? (
				<Container>
					<InnerContainer>
						<TitleText>{item.name}</TitleText>
						<SubtitleText>{item.score} pt</SubtitleText>
					</InnerContainer>
				</Container>
			) : (
				<View />
			)}
		</View>
	);
};
