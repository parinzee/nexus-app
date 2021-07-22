import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../Header";
import { LogBox, RefreshControl } from "react-native";
import Scores from "./Scores";
import Content from "../Content";

function useForceUpdate() {
	const [value, setValue] = useState(0);
	return () => setValue((value) => value + 1);
}

export default function Activities({}) {
	const [refreshing, setRefreshing] = React.useState(false);
	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		justify-content: center;
		align-content: center;
	`;

	const AnotherContainer = styled.ScrollView``;

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	return (
		<Container>
			<Header text="Team Colors" fontSize="35" />
			<AnotherContainer
				refreshControl={
					<RefreshControl
						tintColor="#5071f6"
						colors={["#5071f6"]}
						refreshing={refreshing}
						onRefresh={forceUpdate}
					/>
				}
			>
				<Scores
					uri="http://nexussc.herokuapp.com/scores/"
					mainColor="#ff9151"
				/>

				<Content
					uri="http://nexussc.herokuapp.com/events/"
					mainColor="#5071f6"
					type="activities"
				/>
			</AnotherContainer>
		</Container>
	);
}
