import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	View,
	Alert,
} from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogicPart = ({ navigation }) => {
	const [teamColor, setTeamColor] = useState("red");
	const [name, setName] = useState();
	const [grade, setGrade] = useState();
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		if (name != null && grade != null) {
			setButtonDisabled(false);
		}
	}, [name, grade]);

	const handleGrade = (text) => {
		if (text[0] === "0") {
			text = text.slice(1);
		}
		text = parseInt(text);
		setGrade(text);
	};

	const onSubmit = async () => {
		if (grade > 12) {
			Alert.alert(
				"Invalid Grade",
				"Invalid grade level, please enter again.",
				[{ text: "OK" }]
			);
			return;
		} else {
			const JSONName = JSON.stringify(name);
			const JSONGrade = JSON.stringify(grade);
			const JSONTeam = JSON.stringify(teamColor);
			await AsyncStorage.setItem("@name", JSONName);
			await AsyncStorage.setItem("@grade", JSONGrade);
			await AsyncStorage.setItem("@team", JSONTeam);

			navigation.navigate("Screen4");
		}
	};
	return (
		<View>
			<Input
				placeholder="Nickname (eg: John)"
				leftIcon={
					<FontAwesome5 name="address-book" size={24} color="white" />
				}
				inputContainerStyle={{
					marginTop: verticalScale(20),
					marginLeft: moderateScale(20),
					marginRight: moderateScale(20),
				}}
				inputStyle={{ color: "white" }}
				maxLength={10}
				onChangeText={(text) => setName(text)}
			/>
			<Input
				placeholder=" Grade (eg: 7)"
				leftIcon={
					<FontAwesome5 name="address-card" size={24} color="white" />
				}
				inputContainerStyle={{
					marginBottom: verticalScale(-30),
					marginLeft: moderateScale(20),
					marginRight: moderateScale(20),
				}}
				maxLength={2}
				inputStyle={{ color: "white" }}
				keyboardType="numeric"
				onChangeText={(text) => handleGrade(text)}
			/>
			<Picker
				selectedValue={teamColor}
				onValueChange={(itemValue, itemIndex) =>
					setTeamColor(itemValue)
				}
				itemStyle={{ color: "white" }}
			>
				<Picker.Item label="Red Team" value="red" />
				<Picker.Item label="Blue Team" value="blue" />
				<Picker.Item label="Green Team" value="green" />
				<Picker.Item label="Yellow Team" value="yellow" />
			</Picker>
			<TouchableOpacity disabled={buttonDisabled} onPress={onSubmit}>
				<FontAwesome5
					name="arrow-circle-right"
					size={50}
					color={buttonDisabled ? "grey" : "white"}
					style={{
						alignSelf: "center",
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default function Screen3({ navigation }) {
	const InsideContainer = styled.View`
		justify-content: center;
		align-content: center;
	`;

	const HiText = styled.Text`
		text-align: center;
		font-size: ${moderateScale(25)}px;
		margin-bottom: -10px;
		font-family: Now;
		color: white;
	`;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{
				flex: 1,
				flexDirection: "column",
				alignContent: "center",
				justifyContent: "center",
				backgroundColor: "rgb(25,25,25)",
			}}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<InsideContainer>
					<LottieView
						source={require("../../assets/ID.json")}
						autoPlay
						loop={true}
						speed={0.7}
						style={{
							position: "relative",
							width: moderateScale(150),
							height: moderateScale(150),
							alignSelf: "center",
						}}
					/>
					<HiText>Almost Done!</HiText>

					<LogicPart navigation={navigation} />
				</InsideContainer>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
