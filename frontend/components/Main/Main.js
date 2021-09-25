import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import styled from "styled-components/native";
import Header from "../Pages/Header";
import WidgetsDashboard from "./Widgets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator, Modal } from "react-native";
import { moderateScale } from "react-native-size-matters";
import useStoreInfo from "../store";

const requestNotificationsPermission = async () => {
	const { status: existingStatus } =
		await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;
	if (existingStatus !== "granted") {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}
	if (finalStatus !== "granted") {
		return false;
	}
	return true;
};

export default function Main({ navigation }) {
	const name = useStoreInfo((state) => state.name);
	const deviceID = useStoreInfo((state) => state.deviceID);
	const teacher = useStoreInfo((state) => state.teacher);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const OutContainer = styled.View`
		flex: 1;
		background-color: #121212;
		display: flex;
	`;

	const BackupContainer = styled.View`
		flex: 1;
		justify-content: center;
		align-items: center;
	`;

	const ModalContainer = styled.TouchableOpacity`
		flex: 1;
		align-content: center;
		justify-content: center;
		align-items: center;
	`;

	const ModalTitle = styled.Text`
		color: white;
		font-family: System;
		text-align: center;
		font-size: ${moderateScale(25)}px;
		margin-bottom: 10px;
	`;

	const ModalText = styled.Text`
		text-align: center;
		color: white;
		font-family: System;
		font-size: ${moderateScale(13)}px;
	`;

	const InnerContainer = styled.View`
		background-color: rgb(25, 25, 25);
		display: flex;
		flex-direction: column;
		border-width: 1px;
		border-color: white;
		border-radius: 25px;
		width: 30%;
		height: 17%;
		padding: 10px;
	`;

	useEffect(() => {
		async function getData() {
			const yeet = await axios
				.get("https://nbcis.herokuapp.com/")
				.then((response) => {
					return response.data;
				})
				.catch(() => {
					return false;
				});
			if (yeet != false) {
				setLoading(false);
			} else {
				setLoading(false);
				setError(true);
			}
		}
		async function telemetry(pushToken) {
			const gpa = JSON.parse(await AsyncStorage.getItem("@GPA"));
			const teamColor = JSON.parse(await AsyncStorage.getItem("@team"));
			await axios
				.post("https://nbcis.herokuapp.com/insertUser/", {
					deviceID: deviceID,
					name: name,
					teamColor: `${teamColor}`,
					pushToken: pushToken,
					gpa: gpa,
				})
				.catch((err) => console.log(err.response.data));
		}
		async function notifications() {
			const status = JSON.parse(
				await AsyncStorage.getItem("@notifications")
			);
			const settings = await Notifications.getPermissionsAsync();
			if (
				settings.granted === true ||
				settings.ios?.status ===
					Notifications.IosAuthorizationStatus.PROVISIONAL ||
				settings.ios?.status ===
					Notifications.IosAuthorizationStatus.AUTHORIZED ||
				settings.ios?.status ===
					Notifications.IosAuthorizationStatus.EPHEMERAL
			) {
				var allowedNotifs = true;
			}
			if (status === null) {
				const result = await requestNotificationsPermission();
				if (result === false) {
					await AsyncStorage.setItem(
						"@notifications",
						JSON.stringify(false)
					);
					telemetry(null);
				} else {
					await AsyncStorage.setItem(
						"@notifications",
						JSON.stringify(true)
					);
					const token = (await Notifications.getExpoPushTokenAsync())
						.data;
					telemetry(token);
				}
			} else if (status === true || allowedNotifs === true) {
				await AsyncStorage.setItem(
					"@notifications",
					JSON.stringify(true)
				);
				const token = (await Notifications.getExpoPushTokenAsync())
					.data;
				telemetry(token);
			} else {
				telemetry(null);
			}
		}
		const unsubscribe = navigation.addListener("focus", (e) => {
			setLoading(true);
		});
		getData();
		notifications();
		return unsubscribe;
	}, [navigation, loading]);
	return (
		<OutContainer>
			<Modal
				animationType="fade"
				transparent={true}
				visible={error}
				onRequestClose={() => {
					setError(false);
				}}
			>
				<ModalContainer
					onPress={() => {
						setError(false);
					}}
				>
					<InnerContainer>
						<ModalTitle>Error</ModalTitle>
						<ModalText>
							Please check your internet connection.
						</ModalText>
					</InnerContainer>
				</ModalContainer>
			</Modal>
			<Header text={`Hello, ${name}`} fontSize="35" />
			{loading ? (
				<BackupContainer>
					<ActivityIndicator size="large" />
				</BackupContainer>
			) : (
				<WidgetsDashboard
					navigation={navigation}
					setLoading={setLoading}
					teacher={teacher}
				/>
			)}
		</OutContainer>
	);
}
