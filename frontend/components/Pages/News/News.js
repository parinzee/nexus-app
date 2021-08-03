import React, {useEffect, useState, useCallback} from "react";
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from "expo-background-fetch";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components/native";
import Header from "../Header";
import Content from "../Content";
import { ScrollView, RefreshControl } from "react-native";


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
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
	const Container = styled.View`
		flex: 1;
		background-color: #121212;
	`;

	const AnotherContainer = styled.ScrollView``;

    useEffect(() => {
        async function GetStatus() {
            const status = JSON.parse(await AsyncStorage.getItem("@notifications"))
            if (status === null) {
                const result = await requestNotificationsPermission();
                if (result === false) {
                    await AsyncStorage.setItem("@notifications", JSON.stringify(false))
                } else {
                    const BACKGROUND_FETCH_TASK = 'background-fetch';
                    await AsyncStorage.setItem("@notifications", JSON.stringify(true))
                    BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
                        minimumInterval: 60 * 15, // 15 minutes
                        stopOnTerminate: false, // android only,
                        startOnBoot: true, // android only
                    });
                }
            }
        }
        GetStatus();
    }, [])
	return (
		<Container>
			<Header text={`News`} fontSize="35" />
          <ScrollView
                refreshControl={
                    <RefreshControl
                        tintColor="white"
                        colors={["white"]}
                        onRefresh={() => {
                            forceUpdate()
                        }}
                    />
                }
            contentContainerStyle={{alignContent: "center", justifyContent: "center"}}
            indicatorStyle="white"
          >
			<Content
				uri="http://nbcis.herokuapp.com/announcements/"
				mainColor="#CC9B6D"
				type="news"
			/>
        </ScrollView>
		</Container>
	);
}
