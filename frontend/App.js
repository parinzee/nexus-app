import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, OpenSans_800ExtraBold } from "@expo-google-fonts/open-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/main/Main";
import Loader from "./components/Loader";
import Links from "./components/Pages/links/Links";
import Events from "./components/Pages/events/Events";
import Activities from "./components/Pages/activities/Activities"
import Competitions from "./components/Pages/competitions/Competitions"
import Credits from "./components/Pages/credits/Credits"
import { Text } from "react-native";
import { Asset } from "expo-asset";
import { useState } from "react";
import styled from "styled-components/native";
import { enableScreens } from "react-native-screens";
enableScreens();

const Stack = createStackNavigator();

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
        OpenSans_800ExtraBold,
    });

    const Container = styled.View`
        flex: 1;
        background-color: rgb(25, 25, 25);
    `;

    const fetchImages = () => {
        const images = [
            require("./assets/intro.gif"),
            require("./assets/sleepingMan.gif"),
            require("./assets/typingMan.gif"),
            require("./assets/AGuy.gif"),
            require("./assets/teacher.gif"),
            require("./assets/nexus-logo.png")
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
            <Container>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Loading"
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
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={Main}
                            options={{
                                cardStyleInterpolator: forFade,
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Links"
                            component={Links}
                            options={{ headerShown: true }}
                        />
                        <Stack.Screen
                            name="Events"
                            component={Events}
                            options={{ headerShown: true }}
                        />
                        <Stack.Screen
                            name="Activities"
                            component={Activities}
                            options={{ headerShown: true }}
                        />
                        <Stack.Screen
                            name="Competitions"
                            component={Competitions}
                            options={{ headerShown: true }}
                        />
                        <Stack.Screen
                            name="Credits"
                            component={Credits}
                            options={{ headerShown: true }}
                        />
                        <Stack.Screen
                            name="Loading"
                            component={Loader}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                    <StatusBar style="light" />
                </NavigationContainer>
            </Container>
        );
    }
}
