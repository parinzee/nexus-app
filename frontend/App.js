import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, OpenSans_800ExtraBold } from "@expo-google-fonts/open-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/main/Main";
import Loader from "./components/Loader"
import { Text } from "react-native";
import { Asset } from "expo-asset";
import { useState } from "react";

const Stack = createStackNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {

    const [loading, setLoading] = useState(true);

    let [fontsLoaded] = useFonts({
        Now: require("./assets/fonts/NowAlt-Light.otf"),
        OpenSans_800ExtraBold,
    });

    const fetchImages = () => {
        const images = [
            require("./assets/sleepingMan.gif"),
            require("./assets/typingMan.gif"),
            require("./assets/AGuy.gif"),
            require("./assets/teacher.gif"),
            require("./assets/intro.gif"),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        return Promise.all(cacheImages)
    };

    const preload = async () => {
        const imageAssets = fetchImages()
        await Promise.all([imageAssets])
    }

    if (loading) {
        return <AppLoading startAsync={preload} onFinish={() => setLoading(false)} onError={error => console.log(error)}/>;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loading">
                    <Stack.Screen name="Home" component={Main} />
                    <Stack.Screen name="Loading" component={Loader} />
                </Stack.Navigator>
                <StatusBar style="light" />
            </NavigationContainer>
        );
    }
}
