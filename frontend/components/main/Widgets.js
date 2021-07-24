import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { View, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => value + 1); // update the state to force render
}

const TeamColorWidget = ({ teamColor }) => {
	const [item, setItem] = useState(null);
	const [refresh, setRefresh] = useState(true);
	const realColors = ["#D35D6E", "#87A7B3", "#FFCF64", "#83B582"];
	const mainColor =
		teamColor === "red"
			? realColors[0]
			: teamColor === "blue"
			? realColors[1]
			: teamColor === "yellow"
			? realColors[2]
			: realColors[3];

	const Container = styled(LinearGradient).attrs({
		colors: ["#f2e1c1", "#f2e1c1"],
		start: { x: 0, y: 0 },
		end: { x: 1, y: 0 },
	})`
		display: flex;
		border-radius: 10px;
		width: ${moderateScale(320)}px;
		height: ${moderateScale(46)}px;
		margin-top: ${verticalScale(30)}px;
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
		width: ${moderateScale(314)}px;
		height: ${moderateScale(40)}px;
		padding: 5px;
		background-color: ${mainColor};
		padding-right: 30px;
		padding-left: 10px;
		align-self: center;
		justify-content: space-between;
	`;

	const TitleText = styled.Text`
		color: black;
		font-size: ${moderateScale(17)}px;
		font-family: System;
		font-weight: bold;
		margin-left: 10px;
		align-self: center;
	`;

	const SubtitleText = styled.Text`
		color: black;
		font-size: ${moderateScale(17)}px;
		font-family: System;
		font-weight: bold;
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
					name: `${colors[index]}  TEAM`,
					score: value,
					color: realColors[index],
				};
			});
			if (isMounted === true) {
				if (teamColor === "red") {
					setItem(dataArray[0]);
				} else if (teamColor === "blue") {
					setItem(dataArray[1]);
				} else if (teamColor === "yellow") {
					setItem(dataArray[2]);
				} else {
					setItem(dataArray[3]);
				}
				setRefresh(false);
			}
		}
	};

	useEffect(() => {
		let isMounted = true;
		getEvents(isMounted);
		return () => {
			isMounted = false;
		};
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

const NewsWidget = () => {
	const [latestNews, setLatestNews] = useState(null);
	const [refresh, setRefresh] = useState(true);
	const getNews = async (isMounted) => {
		const data = await axios
			.get("http://nexussc.herokuapp.com/announcements/")
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return false;
			});
		if (data != false) {
			if (isMounted) {
				setLatestNews(data.sort((a, b) => b[0] - a[0])[0]);
				setRefresh(false);
			}
		}
	};

	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(120)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
	`;

	const TitleContainer = styled.View`
		border-top-left-radius: 18px;
		border-top-right-radius: 18px;
		height: ${moderateScale(35)}px;
		width: 100%;
		background-color: white;
		border-bottom-color: #ffcf64;
		border-bottom-width: 1.5px;
		background-color: rgb(50, 50, 50);
	`;

	const TitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(19)}px;
		font-family: "OpenSans_800ExtraBold";
		margin-left: 10px;
		margin-bottom: 3px;
		margin-top: 2px;
	`;

	const SubtitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(16)}px;
		font-family: "System";
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
	`;

	const DateText = styled.Text`
		position: absolute;
		color: grey;
		font-size: ${moderateScale(14)}px;
		font-family: "System";
		bottom: 5px;
		right: 12px;
	`;

	useEffect(() => {
		let isMounted = true;
		getNews(isMounted);
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<View style={{ alignSelf: "center" }}>
			{refresh === false ? (
				<Container>
					<TitleContainer>
						<TitleText>{latestNews[1]}</TitleText>
					</TitleContainer>
					<SubtitleText>{latestNews[2].split("--")[0]}</SubtitleText>
					<DateText>
						Posted on {latestNews[2].split("--")[1]}
					</DateText>
				</Container>
			) : (
				<View />
			)}
		</View>
	);
};

const EventsWidget = () => {
	const [latestNews, setLatestNews] = useState(null);
	const [refresh, setRefresh] = useState(true);
	const getNews = async (isMounted) => {
		const data = await axios
			.get("http://nexussc.herokuapp.com/events/")
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return false;
			});
		if (data != false) {
			if (isMounted) {
				setLatestNews(data.sort((a, b) => b[0] - a[0])[0]);
				setRefresh(false);
			}
		}
	};

	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(120)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
	`;

	const TitleContainer = styled.View`
		border-top-left-radius: 18px;
		border-top-right-radius: 18px;
		height: ${moderateScale(35)}px;
		width: 100%;
		background-color: white;
		border-bottom-color: #5071f6;
		border-bottom-width: 1.5px;
		background-color: rgb(50, 50, 50);
	`;

	const TitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(19)}px;
		font-family: "OpenSans_800ExtraBold";
		margin-left: 10px;
		margin-bottom: 3px;
		margin-top: 2px;
	`;

	const SubtitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(16)}px;
		font-family: "System";
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
	`;

	const DateText = styled.Text`
		position: absolute;
		color: grey;
		font-size: ${moderateScale(14)}px;
		font-family: "System";
		bottom: 5px;
		right: 12px;
	`;

	useEffect(() => {
		let isMounted = true;
		getNews(isMounted);
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<View style={{ alignSelf: "center" }}>
			{refresh === false ? (
				<Container>
					<TitleContainer>
						<TitleText>{latestNews[1]}</TitleText>
					</TitleContainer>
					<SubtitleText>{latestNews[2].split("--")[0]}</SubtitleText>
					<DateText>
						Posted on {latestNews[2].split("--")[1]}
					</DateText>
				</Container>
			) : (
				<View />
			)}
		</View>
	);
};

const GPAWidget = ({ navigation }) => {
	const [refresh, setRefresh] = useState(true);
	const [GPA, setGPA] = useState(null);
	const getNews = async (isMounted) => {
		const data = JSON.parse(await AsyncStorage.getItem("@GPA"));
		if (isMounted) {
			setGPA(data);
			setRefresh(false);
		}
	};
	const Container = styled.View`
		display: flex;
		flex-direction: row;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(110)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
	`;

	const LeftContainer = styled.View`
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 30%;
		border-right-color: white;
		border-right-width: 1px;
		justify-content: center;
		align-items: center;
	`;

	const TopText = styled.Text`
		font-family: System;
		color: white;
		font-size: ${moderateScale(20)}px;
		text-align: center;
	`;

	const BottomText = styled.Text`
		font-family: System;
		color: white;
		font-size: ${moderateScale(25)}px;
		text-align: center;
	`;

	useEffect(() => {
		let isMounted = true;
		getNews(isMounted);
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<View style={{ alignSelf: "center" }}>
			{refresh === false ? (
				<Container>
					<LeftContainer>
						<TopText>Current</TopText>
						<BottomText>GPA</BottomText>
					</LeftContainer>
					<View
						style={{
							alignSelf: "center",
							margin: "auto",
							width: "70%",
						}}
					>
						{GPA != null ? (
							<Button
								title={`  ${GPA.toString()}`}
								containerStyle={{
									alignSelf: "center",
								}}
								buttonStyle={{
									backgroundColor: "#f2e1c1",
								}}
								titleStyle={{
									fontSize: moderateScale(20),
									color: "black",
								}}
								icon={
									<FontAwesome5
										name="calculator"
										size={moderateScale(15)}
										color="black"
									/>
								}
								onPress={() => {
									navigation.navigate("Tools");
								}}
								raised={true}
							/>
						) : (
							<Button
								title="  Calculate Grade"
								containerStyle={{
									alignSelf: "center",
								}}
								buttonStyle={{
									backgroundColor: "#f2e1c1",
								}}
								titleStyle={{
									color: "black",
								}}
								onPress={() => {
									navigation.navigate("Tools");
								}}
								icon={
									<FontAwesome5
										name="calculator"
										size={moderateScale(15)}
										color="black"
									/>
								}
								raised={true}
							/>
						)}
					</View>
				</Container>
			) : (
				<View />
			)}
		</View>
	);
};

const TaskWidget = ({ navigation }) => {
	const [refresh, setRefresh] = useState(true);
	const [set, setGPA] = useState(null);
	const getNews = async (isMounted) => {
		const data = JSON.parse(await AsyncStorage.getItem("@GPA"));
		if (isMounted) {
			setGPA(data);
			setRefresh(false);
		}
	};
	const Container = styled.View`
		display: flex;
		flex-direction: row;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(110)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
	`;

	const LeftContainer = styled.View`
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 30%;
		border-right-color: white;
		border-right-width: 1px;
		justify-content: center;
		align-items: center;
	`;

	const TopText = styled.Text`
		font-family: System;
		color: white;
		font-size: ${moderateScale(20)}px;
		text-align: center;
	`;

	const BottomText = styled.Text`
		font-family: System;
		color: white;
		font-size: ${moderateScale(25)}px;
		text-align: center;
	`;

	useEffect(() => {
		let isMounted = true;
		getNews(isMounted);
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<View style={{ alignSelf: "center" }}>
			{refresh === false ? (
				<Container>
					<LeftContainer>
						<TopText>Current</TopText>
						<BottomText>GPA</BottomText>
					</LeftContainer>
					<View
						style={{
							alignSelf: "center",
							margin: "auto",
							width: "70%",
						}}
					>
						{GPA != null ? (
							<Button
								title={GPA.toString()}
								containerStyle={{
									alignSelf: "center",
								}}
								titleStyle={{
									fontSize: moderateScale(25),
								}}
								onPress={() => {
									navigation.navigate("Tools");
								}}
							/>
						) : (
							<Button
								title="Calculate Grade"
								containerStyle={{
									alignSelf: "center",
								}}
								onPress={() => {
									navigation.navigate("Tools");
								}}
							/>
						)}
					</View>
				</Container>
			) : (
				<View />
			)}
		</View>
	);
};

export default function WidgetsDashboard({ navigation }) {
	const [color, setColor] = useState();
	const [loading, setLoading] = useState(true);
	const forceUpdate = useForceUpdate();

	async function getColor(isMounted) {
		if (isMounted) {
			setColor(JSON.parse(await AsyncStorage.getItem("@team")));
			await axios.get("https://nexussc.herokuapp.com/events/");
			setTimeout(() => setLoading(false), 500);
		}
	}

	useEffect(() => {
		let isMounted = true;
		getColor(isMounted);
		return () => {
			isMounted = false;
		};
	});

	const AnotherContainer = styled.ScrollView``;
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
		display: flex;
		justify-content: center;
		align-content: center;
	`;
	return (
		<Container>
			{!loading ? (
				<AnotherContainer
					refreshControl={
						<RefreshControl
							tintColor="white"
							colors={["white"]}
							refreshing={loading}
							onRefresh={forceUpdate}
						/>
					}
				>
					<GPAWidget navigation={navigation} />
					<TeamColorWidget teamColor={color} />
					<NewsWidget />
					<EventsWidget />
				</AnotherContainer>
			) : (
				<ActivityIndicator size="large" />
			)}
		</Container>
	);
}
