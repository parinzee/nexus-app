import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

const useStoreInfo = create((set) => ({
	name: "",
	deviceID: "",
	team: "",
	teacher: false,
	grade: 0,
	honors: true,
	setDeviceInfo: async () => {
		const name = JSON.parse(await AsyncStorage.getItem("@name"));
		const deviceID = JSON.parse(await AsyncStorage.getItem("@deviceID"));
		const team = JSON.parse(await AsyncStorage.getItem("@team"));
		const teacher = JSON.parse(await AsyncStorage.getItem("@teacher"));
		const grade = JSON.parse(await AsyncStorage.getItem("@grade"));
		const honors = JSON.parse(await AsyncStorage.getItem("@honors"));
		set({
			name: name,
			deviceID: deviceID,
			team: team,
			teacher: teacher,
			grade: grade,
			honors: honors,
		});
	},
}));

export default useStoreInfo;
