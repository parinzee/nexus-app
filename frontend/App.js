import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import {
	useFonts,
	OpenSans_800ExtraBold,
	OpenSans_300Light,
} from "@expo-google-fonts/open-sans";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Main from "./components/Main/Main";
import News from "./components/Pages/News/News";
import TeamColor from "./components/Pages/TeamColor/TeamColor";
import { Text } from "react-native";
import { Asset } from "expo-asset";
import { useState } from "react";
import { enableScreens } from "react-native-screens";
enableScreens();

const Tab = AnimatedTabBarNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {
	const [loading, setLoading] = useState(true);

	let [fontsLoaded] = useFonts({
		Now: require("./assets/fonts/NowAlt-Light.otf"),
		Momcake: require("./assets/fonts/Momcake.otf"),
		OpenSans_800ExtraBold,
		OpenSans_300Light,
	});

	const fetchImages = () => {
		const images = [
			require("./assets/intro.gif"),
			require("./assets/sleepingMan.gif"),
			require("./assets/typingMan.gif"),
			require("./assets/AGuy.gif"),
			require("./assets/teacher.gif"),
			require("./assets/nexus-logo.png"),
		];

		const cacheImages = images.map((image) => {
			return Asset.fromModule(image).downloadAsync();
		});

		return Promise.all(cacheImages);
	};

	const preload = async () => {
		const imageAssets = fetchImages();
		await Promise.all([imageAssets]);
	};

	if (loading || !fontsLoaded) {
		return (
			<AppLoading
				startAsync={preload}
				onFinish={() => setLoading(false)}
				onError={(error) => console.log(error)}
			/>
		);
	} else {
		return (
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName="Home"
					detachInactiveScreens={true}
					tabBarOptions={{ inactiveTintColor: "white" }}
					appearance={{
						tabBarBackground: "rgb(45,45,45)",
						floating: true,
					}}
				>
					<Tab.Screen
						name="Home"
						component={Main}
						options={{
							tabBarLabel: "Home",
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5
									name="home"
									size={size}
									color={color}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="News"
						component={News}
						options={{
							tabBarLabel: "News",
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5
									name="newspaper"
									size={size}
									color={color}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="Team Color"
						component={TeamColor}
						options={{
							tabBarLabel: "Team Color",
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5
									name="flag"
									size={size}
									color={color}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="Me"
						component={TeamColor}
						options={{
							tabBarLabel: "Me",
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5
									name="user"
									size={size}
									color={color}
								/>
							),
						}}
					/>
				</Tab.Navigator>
				<StatusBar style="light" />
			</NavigationContainer>
		);
	}
}
