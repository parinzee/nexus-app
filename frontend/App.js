import { StatusBar } from "expo-status-bar";
import React from "react";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  OpenSans_800ExtraBold,
  OpenSans_300Light,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import * as TaskManager from "expo-task-manager";
import { NavigationContainer } from "@react-navigation/native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/Main/Main";
import Verse from "./components/Main/BibleVerse";
import News from "./components/Pages/News/News";
import TeamColor from "./components/Pages/TeamColor/TeamColor";
import Tools from "./components/Pages/Tools/Tools";
import Screen1 from "./components/FirstTime/Screen1";
import Screen2 from "./components/FirstTime/Screen2";
import Screen3 from "./components/FirstTime/Screen3";
import Screen4 from "./components/FirstTime/Screen4";
import GPA4 from "./components/Pages/Tools/GPA4";
import PopCat from "./components/Pages/Tools/Popcat";
import Popcat_Leaderboard from "./components/Pages/Tools/PopcatLeaderboard";
import Todo from "./components/Pages/Tools/Todo";
import Clicker from "./components/Pages/Tools/Clicker";
import TicTacToe from "./components/Pages/Tools/TicTacToe";
import Contact from "./components/Pages/Tools/Contact";
import Credits from "./components/Pages/Credits/Credits";
import { Text, Animated } from "react-native";
import { Asset } from "expo-asset";
import { useState, useEffect } from "react";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreInfo from "./components/store";
import * as Sentry from "sentry-expo";
import { telemetry } from "./utils/telemetry";

let showFirstScreen = undefined;

Sentry.init({
  dsn: "https://7bddb8945f1a4a2ab0e5ab1550f109f1@o1020761.ingest.sentry.io/5986303",
  enableInExpoDevelopment: true,
  debug: false,
});

const prefix = Linking.createURL("/");
const handleNewNotification = async (data) => {
  try {
    Linking.openURL(prefix + data.Link);
    await Notifications.setBadgeCountAsync(1);
  } catch (error) {
    console.error(error);
  }
};

enableScreens();

const Tab = AnimatedTabBarNavigator();
const Stack = createStackNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    handleNewNotification(data.notification.data);
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function App() {
  const initStore = useStoreInfo((state) => state.setDeviceInfo);
  const linking = {
    prefixes: [prefix],
  };

  const [appIsReady, setAppIsReady] = useState(true);

  let [fontsLoaded] = useFonts({
    Now: require("./assets/fonts/NowAlt-Medium.otf"),
    Momcake: require("./assets/fonts/Momcake.otf"),
    OpenSans_800ExtraBold,
    OpenSans_300Light,
    OpenSans_400Regular,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  const fetchImages = () => {
    const images = [
      require("./assets/nexus-logo.png"),
      require("./assets/valley.jpg"),
      require("./assets/click.mp3"),
      require("./assets/Cat-Open.png"),
      require("./assets/Cat-Closed.png"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      handleNewNotification(response.notification.request.content.data);
    });
    prepare();
  }, []);

  async function genDeviceID() {
    const deviceID = await AsyncStorage.getItem("@deviceID");
    if (deviceID === null) {
      const generateDeviceID = () => Math.random().toString(20).substr(2, 10);
      await AsyncStorage.setItem(
        "@deviceID",
        JSON.stringify(generateDeviceID())
      );
    }
  }

  async function checkFirstTime() {
    const value = await AsyncStorage.getItem("@firstTime");
    if (value != null) {
      showFirstScreen = false;
    } else {
      showFirstScreen = true;
    }
  }

  const preload = async () => {
    initStore();
    await checkFirstTime();
    const imageAssets = fetchImages();
    const deviceId = genDeviceID();
    await Promise.all([imageAssets, deviceId]);
  };

  async function prepare() {
    try {
      await SplashScreen.preventAutoHideAsync();
      await preload();
      await SplashScreen.hideAsync();
      setAppIsReady(true);
      await telemetry();
    } catch (e) {
      console.warn(e);
      setAppIsReady(true);
      await SplashScreen.hideAsync();
      await telemetry();
    }
  }

  if (!appIsReady || !fontsLoaded) {
    return <StatusBar style="light" />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        detachInactiveScreens={true}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "white",
          },
          cardStyleInterpolator: forSlide,
        }}
      >
        {showFirstScreen ? (
          <>
            <Stack.Screen
              name="Screen1"
              component={Screen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Screen2"
              component={Screen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Screen3"
              component={Screen3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Screen4"
              component={Screen4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{
                headerShown: false,
                title: "Home",
                headerTitle: "Home",
              }}
            />
            <Stack.Screen
              name="Verse Of The Week"
              component={Verse}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Grade Calculator"
              component={GPA4}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PopCat"
              component={PopCat}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PopCat Leaderboard"
              component={Popcat_Leaderboard}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="My Tasks"
              component={Todo}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Clicker"
              component={Clicker}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Tic Tac Toe"
              component={TicTacToe}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Contact Us"
              component={Contact}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Credits"
              component={Credits}
              options={{
                headerShown: true,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{
                headerShown: false,
                title: "Home",
                headerTitle: "Home",
              }}
            />
            <Stack.Screen
              name="Verse Of The Week"
              component={Verse}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Grade Calculator"
              component={GPA4}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PopCat"
              component={PopCat}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PopCat Leaderboard"
              component={Popcat_Leaderboard}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="My Tasks"
              component={Todo}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Clicker"
              component={Clicker}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Tic Tac Toe"
              component={TicTacToe}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Contact Us"
              component={Contact}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Credits"
              component={Credits}
              options={{
                headerShown: true,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

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
      tabBarOptions={{
        inactiveTintColor: "white",
        activeBackgroundColor: "#F5B971",
      }}
      appearance={{
        tabBarBackground: "rgb(50,50,50)",
        floating: true,
      }}
      lazy={true}
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
            <FontAwesome5 name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Team Color"
        component={TeamColor}
        options={{
          tabBarLabel: "Teams",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={Tools}
        options={{
          tabBarLabel: "Tools",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={size + 5}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
