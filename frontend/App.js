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
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/Main/Main";
import News from "./components/Pages/News/News";
import TeamColor from "./components/Pages/TeamColor/TeamColor";
import Me from "./components/Pages/Me/Me";
import Screen1 from "./components/FirstTime/Screen1";
import Screen2 from "./components/FirstTime/Screen2";
import { Text, Animated } from "react-native";
import { Asset } from "expo-asset";
import { useState } from "react";
import { enableScreens } from "react-native-screens";
enableScreens();

const Tab = AnimatedTabBarNavigator();
const Stack = createStackNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: "clamp",
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: "clamp",
			  })
			: 0
	);

	return {
		cardStyle: {
			transform: [
				{
					translateX: Animated.multiply(
						progress.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								screen.width, // Focused, but offscreen in the beginning
								0, // Fully focused
								screen.width * -0.3, // Fully unfocused
							],
							extrapolate: "clamp",
						}),
						inverted
					),
				},
			],
		},
	};
};

const MainTab = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			detachInactiveScreens={true}
			tabBarOptions={{ inactiveTintColor: "white" }}
			appearance={{
				tabBarBackground: "rgb(55,55,55)",
				floating: true,
			}}
		>
			<Tab.Screen
				name="Home"
				component={Main}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="home" size={size} color={color} />
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
						<FontAwesome5 name="flag" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Me"
				component={Me}
				options={{
					tabBarLabel: "Me",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="user" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default function App() {
	const [loading, setLoading] = useState(true);

	let [fontsLoaded] = useFonts({
		Now: require("./assets/fonts/NowAlt-Light.otf"),
		Momcake: require("./assets/fonts/Momcake.otf"),
		OpenSans_800ExtraBold,
		OpenSans_300Light,
	});

	const fetchImages = () => {
		const images = [require("./assets/nexus-logo.png")];

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
				<Stack.Navigator
					detachInactiveScreens={true}
					screenOptions={{
						headerStyle: {
							backgroundColor: "rgb(25,25,25)",
							elevation: 0,
							shadowOpacity: 0,
							borderBottomWidth: 0,
						},
						headerTitleStyle: {
							color: "rgb(25,25,25)",
						},
						cardStyleInterpolator: forSlide,
						headerShown: false,
					}}
				>
					<Stack.Screen name="Screen1" component={Screen1} />
					<Stack.Screen name="Screen2" component={Screen2} />
					<Stack.Screen name="Main" component={MainTab} />
				</Stack.Navigator>
				<StatusBar style="light" />
			</NavigationContainer>
		);
	}
}
