import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Input, CheckBox } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogicPart = ({ navigation }) => {
  const [teamColor, setTeamColor] = useState("red");
  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);
  const [role, setRole] = useState(null);
  const [honors, setHonors] = useState(false);
  const [standards, setStandards] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [items, setItems] = useState([
    { label: "Red Team", value: "red" },
    { label: "Blue Team", value: "blue" },
    { label: "Green Team", value: "green" },
    { label: "Yellow Team", value: "yellow" },
  ]);

  const [items3, setItems3] = useState([
    { label: "Red Team", value: "red" },
    { label: "Blue Team", value: "blue" },
    { label: "Green Team", value: "green" },
    { label: "Yellow Team", value: "yellow" },
    { label: "No Team Color", value: "none" },
  ]);

  const [items2, setItems2] = useState([
    { label: "Student", value: "student" },
    { label: "Parent", value: "parent" },
    { label: "Teacher or Staff", value: "teacher" },
    { label: "Other", value: "other" },
  ]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    if (name != null && (role != "student" || grade != null)) {
      setButtonDisabled(false);
    }
    if (role != "student") {
      setTeamColor("none");
    } else {
      setTeamColor("red");
    }
  }, [name, grade, role]);

  const handleGrade = (text) => {
    if (text[0] === "0") {
      text = text.slice(1);
    }
    text = parseInt(text);
    setGrade(text);
  };

  const handleStandards = () => {
    setStandards(!standards);
  };

  const handleHonors = () => {
    setHonors(!honors);
  };

  const handleTeacher = () => {
    setTeacher(!teacher);
  };

  const onSubmit = async () => {
    if (role === "student") {
      if (grade > 12) {
        Alert.alert(
          "Invalid Grade",
          "Invalid grade level, please enter again.",
          [{ text: "OK" }]
        );
        return;
      } else if (standards === honors && !teacher && grade >= 9) {
        if (standards === true) {
          Alert.alert("Invalid Class", "Please select standards OR honors.", [
            { text: "OK" },
          ]);
          return;
        } else {
          Alert.alert(
            "Invalid Class",
            "Please select either standards or honors."
          );
        }
      } else {
        const JSONName = JSON.stringify(name);
        const JSONGrade = JSON.stringify(grade);
        const JSONTeam = JSON.stringify(teamColor);
        const JSONHonors = JSON.stringify(honors);
        await AsyncStorage.setItem("@honors", JSONHonors);
        await AsyncStorage.setItem("@name", JSONName);
        await AsyncStorage.setItem("@grade", JSONGrade);
        await AsyncStorage.setItem("@team", JSONTeam);
        navigation.navigate("Screen4");
      }
    } else {
      const JSONTeacher = JSON.stringify(true);
      const JSONName = JSON.stringify(name);
      const JSONTeam = JSON.stringify(teamColor);
      await AsyncStorage.setItem("@name", JSONName);
      await AsyncStorage.setItem("@team", JSONTeam);
      await AsyncStorage.setItem("@teacher", JSONTeacher);
      navigation.navigate("Screen4");
    }
  };

  return (
    <ScrollView>
      {/* <View
				style={{
					alignSelf: "center",
					marginBottom: verticalScale(20),
					width: "85%",
					marginLeft: 0,
					marginRight: 0,
					marginTop: verticalScale(7),
					justifyContent: "center",
					flexDirection: "row",
				}}
			> */}
      {/* <CheckBox
					title="Teacher/Parent"
					textStyle={{ color: "white" }}
					checked={teacher}
					containerStyle={{
						backgroundColor: "#292d3e",
						alignSelf: "center",
						width: "40%",
						marginLeft: 0,
					}}
					onPress={handleTeacher}
				/>
				<CheckBox
					title="Student"
					textStyle={{ color: "white" }}
					checked={!teacher}
					containerStyle={{
						backgroundColor: "#292d3e",
						alignSelf: "center",
						width: "40%",
						marginRight: 0,
					}}
					onPress={handleTeacher}
				/> */}
      <DropDownPicker
        open={open2}
        value={role}
        items={items2}
        setOpen={setOpen2}
        setValue={setRole}
        setItems={setItems2}
        containerStyle={{
          alignSelf: "center",
          width: "85%",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 9,
          marginBottom: verticalScale(20),
        }}
        dropDownContainerStyle={{
          borderColor: "white",
          borderWidth: 1,
        }}
        dropDownDirection="TOP"
        theme="DARK"
        listMode="MODAL"
        placeholder="Choose your identity"
      />
      {/* </View> */}
      {role === null ? null : (
        <View>
          <Input
            label="Nickname"
            labelStyle={{
              marginLeft: moderateScale(20),
              color: "white",
            }}
            placeholder="John"
            leftIcon={
              <FontAwesome5 name="address-book" size={24} color="white" />
            }
            inputContainerStyle={{
              marginLeft: moderateScale(20),
              marginRight: moderateScale(20),
            }}
            inputStyle={{ color: "white" }}
            maxLength={10}
            onChangeText={(text) => setName(text)}
          />
          {role === "parent" ||
          role === "teacher" ||
          role === "other" ? null : (
            <Input
              label="Grade Level"
              labelStyle={{
                marginLeft: moderateScale(20),
                color: "white",
              }}
              placeholder="7"
              leftIcon={
                <FontAwesome5 name="address-card" size={24} color="white" />
              }
              inputContainerStyle={{
                marginRight: moderateScale(20),
                marginLeft: moderateScale(20),
              }}
              maxLength={2}
              inputStyle={{ color: "white" }}
              keyboardType="numeric"
              onChangeText={(text) => handleGrade(text)}
            />
          )}
          {role === "parent" ||
          role === "teacher" ||
          role === "other" ||
          grade < 9 ? null : (
            <View
              style={{
                alignSelf: "center",
                marginBottom: verticalScale(10),
                width: "85%",
                marginLeft: 0,
                marginRight: 0,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <CheckBox
                title="Honors"
                textStyle={{ color: "white" }}
                checked={honors}
                containerStyle={{
                  backgroundColor: "#292d3e",
                  alignSelf: "center",
                  width: "45%",
                  marginBottom: verticalScale(10),
                  marginLeft: 0,
                }}
                onPress={handleHonors}
              />
              <CheckBox
                title="Standards"
                textStyle={{ color: "white" }}
                checked={standards}
                containerStyle={{
                  backgroundColor: "#292d3e",
                  alignSelf: "center",
                  width: "44%",
                  marginBottom: verticalScale(10),
                  marginRight: 0,
                }}
                onPress={handleStandards}
              />
            </View>
          )}
          {role === "other" ? null : (
            <DropDownPicker
              open={open}
              value={role === "student" ? teamColor : "none"}
              items={role === "student" ? items : items3}
              setOpen={setOpen}
              setValue={setTeamColor}
              setItems={setItems}
              containerStyle={{
                alignSelf: "center",
                width: "85%",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 9,
                marginBottom: verticalScale(20),
              }}
              dropDownContainerStyle={{
                borderColor: "white",
                borderWidth: 1,
              }}
              dropDownDirection="TOP"
              theme="DARK"
              listMode="MODAL"
            />
          )}
          <TouchableOpacity disabled={buttonDisabled} onPress={onSubmit}>
            <FontAwesome5
              name="arrow-circle-right"
              size={50}
              color={buttonDisabled ? "grey" : "white"}
              style={{
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default function Screen3({ navigation }) {
  const InsideContainer = styled.View`
    justify-content: center;
    align-content: center;
  `;

  const HiText = styled.Text`
    text-align: center;
    font-size: ${moderateScale(25)}px;
    margin-bottom: 10px;
    font-family: Now;
    color: white;
  `;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <InsideContainer>
          <LottieView
            source={require("../../assets/ID.json")}
            autoPlay
            loop={true}
            speed={0.7}
            style={{
              position: "relative",
              width: moderateScale(150),
              height: moderateScale(150),
              alignSelf: "center",
            }}
          />
          <HiText>Almost Done!</HiText>

          <LogicPart navigation={navigation} />
        </InsideContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
