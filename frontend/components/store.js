import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

const useStoreInfo = create((set) => ({
  name: "",
  deviceID: "",
  team: "",
  teacher: false,
  grade: 0,
  honors: true,
  clicker: {},
  setDeviceInfo: async () => {
    const nameStatus = JSON.parse(await AsyncStorage.getItem("@name"));
    const deviceIDStatus = JSON.parse(await AsyncStorage.getItem("@deviceID"));
    const teamStatus = JSON.parse(await AsyncStorage.getItem("@team"));
    const teacherStatus = JSON.parse(await AsyncStorage.getItem("@teacher"));
    const gradeStatus = JSON.parse(await AsyncStorage.getItem("@grade"));
    const honorsStatus = JSON.parse(await AsyncStorage.getItem("@honors"));
    if (nameStatus === "Parin" || new Date() > new Date(2021, 8, 27)) {
      var clickerStatus = true;
    } else {
      var clickerStatus = false;
    }
    set({
      name: nameStatus,
      deviceID: deviceIDStatus,
      team: teamStatus,
      teacher: teacherStatus,
      grade: gradeStatus,
      honors: honorsStatus,
      clicker: clickerStatus,
    });
  },
}));

export default useStoreInfo;
