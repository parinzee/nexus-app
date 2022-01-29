import axios from "axios";
import * as Sentry from "sentry-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const requestNotificationsPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};

const pushData = async (pushToken) => {
  const deviceID = JSON.parse(await AsyncStorage.getItem("@deviceID"));
  const name = JSON.parse(await AsyncStorage.getItem("@name"));
  const gpa = JSON.parse(await AsyncStorage.getItem("@GPA"));
  const teamColor = JSON.parse(await AsyncStorage.getItem("@team"));
  if (name != null) {
    await axios
      .post("https://nbcis.herokuapp.com/insertUser/", {
        deviceID: deviceID,
        name: name,
        teamColor: teamColor,
        pushToken: pushToken,
        gpa: gpa,
      })
      .catch((err) => Sentry.Native.captureException(err));
  }
};

export async function telemetry() {
  // Ask for notification permission
  const notificationStatus = await requestNotificationsPermission();
  // Get pushtoken
  if (notificationStatus) {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    // Push the tokens to our server
    await pushData(token);
    return true;
  } else {
    await pushData(null);
    return true;
  }
}
