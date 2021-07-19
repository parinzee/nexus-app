import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { Modal, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { moderateScale, verticalScale } from "react-native-size-matters";

const Item = ({ eventName, eventDesc, mainColor }) => {
	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: ${mainColor};
		border-radius: 20px;
		width: ${moderateScale(295)}px;
		height: ${moderateScale(100)}px;
		margin-top: ${verticalScale(30)}px;
		padding: 5px;
		margin-right: 20px;
		margin-left: 20px;
		padding-right: 10px;
	`;

	const TitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(19)}px;
		font-family: "OpenSans_800ExtraBold";
		margin-left: 10px;
		margin-bottom: 3px;
	`;

	const SubtitleText = styled.Text`
		color: white;
		font-size: ${moderateScale(16)}px;
		font-family: "OpenSans_300Light";
		margin-left: 10px;
	`;
	return (
		<Container>
			<TitleText>{eventName}</TitleText>
			<SubtitleText>{eventDesc}</SubtitleText>
		</Container>
	);
};

export default function BottomContent({ uri, mainColor }) {
	const [items, setItems] = useState([]);
	const [refresh, setRefresh] = useState(true);
	const [error, setError] = useState(false);

	const getEvents = async () => {
		const data = await axios
			.get(uri)
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return false;
			});
		if (data === false) {
			setError(true);
			setRefresh(false);
		} else {
			setItems(data.sort((a, b) => b[0] - a[0]));
			setRefresh(false);
		}
	};
	useEffect(() => {
		getEvents();
	}, [refresh]);

	const ListContainer = styled.View`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		margin-top: ${verticalScale(10)}px;
		flex: 1;
	`;

	const ModalContainer = styled.TouchableOpacity`
		flex: 1;
		align-content: center;
		justify-content: center;
		align-items: center;
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
	return (
		<ListContainer>
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
			{refresh === false ? (
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<Item
							eventName={item[1]}
							eventDesc={item[2]}
							mainColor={mainColor}
						/>
					)}
					keyExtractor={(entry) => entry[0].toString()}
				/>
			) : (
				<ActivityIndicator size="large" color={mainColor} />
			)}
		</ListContainer>
	);
}
