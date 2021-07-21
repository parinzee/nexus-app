import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "react-native-size-matters";
import {
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Input } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";

const Task = ({ todo, setCheck, setRemove }) => {
	const { title, isChecked } = todo;
	const TaskContainer = styled.View`
		width: 85%;
		background-color: #20212c;
		flex-direction: row;
		justify-content: space-between;
	`;
	const TitleText = styled.Text`
		color: white;
		font-family: System;
		font-size: moderateScale(15);
	`;

	const Inner = styled.Pressable`
		flex-direction: row;
	`;

	return (
		<TaskContainer>
			<Inner>
				<MaterialIcons
					name={isChecked ? "check-box" : "check-box-outline-blank"}
					size={24}
					color="#F977A1"
				/>
				<TitleText>{title}</TitleText>
			</Inner>
			<MaterialIcons name="delete" size={24} color="#F977A1" />
		</TaskContainer>
	);
};

const AddTodos = ({ HandleAddTask }) => {
	const [todo, setTodo] = useState("Walk the dog");

	const textInputRef = useRef(null);

	// ref
	const bottomSheetRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ["5%", "10%"], []);

	// callbacks
	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index);
	}, []);

	const Background = styled.View`
		background-color: rgb(50, 50, 50);
	`;
	const Container = styled.View`
		flex: 1;
		flex-direction: row;
	`;

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={1}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			backgroundComponent={Background}
			keyboardBehavior="interactive"
			keyboardBlurBehavior="restore"
		>
			<Container>
				<BottomSheetTextInput
					ref={textInputRef}
					placeholder="Add your task/notes here!"
					placeholderTextColor="grey"
					style={{
						borderRadius: 10,
						width: "80%",
						height: verticalScale(40),
						borderColor: "white",
						borderWidth: 1,
						marginLeft: moderateScale(10),
						paddingLeft: moderateScale(5),
						color: "white",
					}}
					onChangeText={(text) => {
						textInputRef.current.value = text;
					}}
				/>
				<LinearGradient
					colors={["#CA4AD0", "#FC9187"]}
					style={{
						borderRadius: 15,
						marginLeft: 10,
						width: "10%",
						height: verticalScale(40),
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					<MaterialIcons
						name="add"
						size={moderateScale(28)}
						color="white"
						style={{ alignSelf: "center" }}
						onPress={() =>
							HandleAddTask(textInputRef.current.value)
						}
					/>
				</LinearGradient>
			</Container>
		</BottomSheet>
	);
};

export default function Todo() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function ReadTasks() {
			const tasksArr = JSON.parse(await AsyncStorage.getItem("@tasks"));
			if (tasksArr == null) {
				console.log("No tasks");
			} else {
				setTasks(tasksArr);
			}
		}
		ReadTasks();
	}, []);

	const HandleAddTask = async (task) => {
		const newTask = { title: task, isChecked: false };
		const newArr = [...tasks, newTask];
		await AsyncStorage.setItem("@tasks", JSON.stringify(newArr));
		setTasks(newArr);
	};

	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
		justify-content: flex-end;
	`;

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<AddTodos HandleAddTask={HandleAddTask} />
			</Container>
		</TouchableWithoutFeedback>
	);
}
