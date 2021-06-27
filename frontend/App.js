import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, OpenSans_800ExtraBold} from "@expo-google-fonts/open-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/main/Main"
import {Text} from 'react-native';

const Stack = createStackNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {
    let [fontsLoaded] = useFonts({
        Now: require("./assets/fonts/NowAlt-Light.otf"),
        OpenSans_800ExtraBold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Main} />
                </Stack.Navigator>
                <StatusBar style="light" />
            </NavigationContainer>
        );
    }
}
