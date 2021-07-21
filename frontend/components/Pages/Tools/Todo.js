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
import { KeyboardAvoidingView, Keyboard } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

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

const AddTodos = () => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		></KeyboardAvoidingView>
	);
};

export default function Todo() {
	const [tasks, setTasks] = useState([]);
	// ref
	const bottomSheetRef = useRef < BottomSheet > null;

	// variables
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	// callbacks
	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index);
	}, []);

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
		const newArr = [...tasks, task];
		await AsyncStorage.setItem("@tasks", JSON.stringify(newArr));
		setTasks(newArr);
	};

	const Container = styled.View`
		flex: 1;
		background-color: rgb(35, 35, 35);
	`;

	return (
		<Container>
			<BottomSheet snapPoints={snapPoints} />
		</Container>
	);
}
