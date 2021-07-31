import React, {useEffect} from "react";
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";


const requestNotificationsPermission = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
	if (finalStatus !== "granted") {
        return false
	}
	return true;
}

export default function Events({}) {
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;

    useEffect(() => {
        async function GetStatus() {
            const status = JSON.parse(await AsyncStorage.getItem("@notifications"))
            if (status === null) {
                const result = await requestNotificationsPermission();
                if (result === false) {
                    await AsyncStorage.setItem("@notifications", JSON.stringify(false))
                }
            }
        }
        GetStatus();
    }, [])
	return (
		<Container>
			<Header text={`News`} fontSize="35" />
			<Content
				uri="http://nbcis.herokuapp.com/announcements/"
				mainColor="#CC9B6D"
				type="news"
			/>
		</Container>
	);
}
