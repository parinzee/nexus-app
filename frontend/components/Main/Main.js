import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Pages/Header";
import WidgetsDashboard from "./Widgets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator, Modal, Alert } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function Main({ navigation }) {
	const [name, setName] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [teacher, setTeacher] = useState();
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
			setName(JSON.parse(await AsyncStorage.getItem("@name")));
			setTeacher(JSON.parse(await AsyncStorage.getItem("@teacher")));
			const yeet = await axios
				.get("http://nbcis.herokuapp.com/")
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
		getData();
	}, [loading]);
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
