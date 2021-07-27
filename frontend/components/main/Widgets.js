import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { View, RefreshControl, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Todo from "../Pages/Tools/Todo";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

const TeamColorWidget = () => {
	const [item, setItem] = useState(null);
	const [refresh, setRefresh] = useState(true);
	const realColors = ["#D35D6E", "#87A7B3", "#FFCF64", "#83B582"];

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
		const teamColor = JSON.parse(await AsyncStorage.getItem("@team"));
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
				const background =
					teamColor === "red"
						? realColors[0]
						: teamColor === "blue"
						? realColors[1]
						: teamColor === "yellow"
						? realColors[2]
						: realColors[3];
				if (teamColor === "red") {
					setItem([dataArray[0], background]);
				} else if (teamColor === "blue") {
					setItem([dataArray[1], background]);
				} else if (teamColor === "yellow") {
					setItem([dataArray[2], background]);
				} else {
					setItem([dataArray[3], background]);
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
					<InnerContainer style={{ backgroundColor: item[1] }}>
						<TitleText>{item[0].name}</TitleText>
						<SubtitleText>{item[0].score} pt</SubtitleText>
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
		if (isMounted && refresh) {
			const getNews = async (isMounted) => {
				const data = JSON.parse(await AsyncStorage.getItem("@GPA"));
				setGPA(data);
				setRefresh(false);
			};
			getNews(isMounted);
		}
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<View style={{ alignSelf: "center" }}>
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
		</View>
	);
};

const TaskWidget = ({ navigation }) => {
	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(200)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
		padding: 5px;
	`;

	const Title = styled.Text`
		text-align: center;
		font-family: System;
		margin-top: ${verticalScale(10)}px;
		font-size: ${moderateScale(20)}px;
		color: white;
	`;

	return (
		<View style={{ alignSelf: "center" }}>
			<Container>
				<Title>Your Tasks</Title>
				<Todo hideAdd={true} />
			</Container>
		</View>
	);
};

const BibleVerseWidget = () => {
	const [verse, setVerse] = useState(null);

	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${verticalScale(200)}px;
		margin-top: ${verticalScale(30)}px;
		border-color: #f2e1c1;
		border-width: 3px;
	`;

	const VerseText = styled.Text`
		font-family: Comfortaa_700Bold;
		color: white;
		text-align: center;
		font-size: ${moderateScale(17)}px;
	`;
	const Verse = styled.Text`
		font-family: Comfortaa_400Regular;
		color: white;
		text-align: center;
		font-size: ${moderateScale(20)}px;
		margin-top: ${verticalScale(20)}px;
	`;

	const getVerse = async (isMounted) => {
		const data = await axios
			.get("http://nexussc.herokuapp.com/verse/")
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return false;
			});
		if (data != false) {
			if (isMounted === true) {
				console.log(data);
				setVerse(data);
			}
		}
	};

	useEffect(() => {
		let isMounted = true;
		getVerse(isMounted);
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<View style={{ alignSelf: "center" }}>
			{verse != null ? (
				<Container>
					<ImageBackground
						source={require("../../assets/valley.jpg")}
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							paddingHorizontal: 10,
						}}
						resizeMode="cover"
						imageStyle={{ borderRadius: 15 }}
					>
						<VerseText adjustsFontSizeToFit numberOfLines={5}>
							{verse[0][1].split("--")[0]}
						</VerseText>
						<Verse>{verse[0][1].split("--")[1]}</Verse>
					</ImageBackground>
				</Container>
			) : null}
		</View>
	);
};

export default function WidgetsDashboard({ navigation, setLoading, teacher }) {
	const AnotherContainer = styled.ScrollView``;
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
		display: flex;
		justify-content: center;
		align-content: center;
	`;
	const ClearFix = styled.View`
		height: 150px;
	`;
	return (
		<Container>
			<AnotherContainer
				refreshControl={
					<RefreshControl
						tintColor="white"
						colors={["white"]}
						onRefresh={() => {
							setLoading(true);
						}}
					/>
				}
			>
				<BibleVerseWidget />
				{teacher ? null : <GPAWidget navigation={navigation} />}
				<TeamColorWidget />
				<NewsWidget />
				<EventsWidget />
				<TaskWidget />
				<ClearFix />
			</AnotherContainer>
		</Container>
	);
}