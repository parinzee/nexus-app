import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    View,
	Modal,
	ActivityIndicator,
    useWindowDimensions
} from "react-native";
import axios from "axios";
import { moderateScale, verticalScale } from "react-native-size-matters";

const Item = ({ eventName, eventDesc, mainColor }) => {
    const windowHeight = useWindowDimensions().height;
	const Container = styled.View`
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 20px;
		width: ${moderateScale(320)}px;
		height: ${windowHeight > 600 ? verticalScale(120) : verticalScale(150)}px;
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
		border-bottom-color: ${mainColor};
		border-bottom-width: 3px;
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

	return (
		<Container>
			<TitleContainer>
				<TitleText>{eventName}</TitleText>
			</TitleContainer>
			<SubtitleText>{eventDesc.split("--")[0]}</SubtitleText>
			<DateText>Posted on {eventDesc.split("--")[1]}</DateText>
		</Container>
	);
};

export default function BottomContent({ uri, mainColor, type }) {
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
			let key = "@" + type
			await AsyncStorage.setItem(key, JSON.stringify(items.length))
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
		flex: 1;
		width: 100%;
	`;

	const ModalContainer = styled.TouchableOpacity`
		flex: 1;
		align-content: center;
		justify-content: center;
		align-items: center;
	`;

	const InnerContainer = styled.View`
		background-color: rgb(25, 25, 25);
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

	const ClearFix = styled.View`
		height: 100px;
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
                items.map((value) => (
                    <Item
						eventName={value[1]}
						eventDesc={value[2]}
						mainColor={mainColor}
                      	key={value[1]}
					/>
                ))
			) : (
                <View style={{justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "50%"}}>
					<ActivityIndicator
					  style={{ textAlign: "center", alignSelf: "center" }}
						size="large"
						color="white"
					/>
                </View>
			)}
			<ClearFix />
		</ListContainer>
	);
}
