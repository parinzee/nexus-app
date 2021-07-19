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
import Main from "./components/main/Main";
import Loader from "./components/Loader";
import Links from "./components/Pages/links/Links";
import Events from "./components/Pages/events/Events";
import Activities from "./components/Pages/activities/Activities";
import Competitions from "./components/Pages/competitions/Competitions";
import Credits from "./components/Pages/credits/Credits";
import { Text } from "react-native";
import { Asset } from "expo-asset";
import { useState } from "react";
import { enableScreens } from "react-native-screens";
enableScreens();

const Tab = AnimatedTabBarNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const forFade = ({ current }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});

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
					detachInactiveScreens={true}
					tabBarOptions={{
						style: {
							backgroundColor: "rgb(25,25,25)",
							elevation: 0,
							shadowOpacity: 0,
							borderTopColor: "black",
							borderTopWidth: 1,
							paddingTop: 5,
							marginBottom: 10,
						},
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
				</Tab.Navigator>
				<StatusBar style="light" />
			</NavigationContainer>
		);
	}
}
