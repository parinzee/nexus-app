import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "react-native-size-matters";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Task = ({
  title,
  isChecked,
  indexProp,
  setCheck,
  setRemove,
  hideAdd,
}) => {
  const [index, setIndex] = useState(indexProp);
  const TaskContainer = styled.View`
    width: 85%;
    background-color: ${hideAdd ? "#A0937D" : "#f2e1c1"};
    border-radius: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
    height: ${hideAdd ? verticalScale(40) : verticalScale(50)}px;
    margin-top: ${hideAdd ? verticalScale(10) : verticalScale(15)}px;
  `;
  const TitleText = styled.Text`
    color: black;
    font-family: System;
    font-size: ${moderateScale(15)}px;
    align-self: center;
    margin-left: ${moderateScale(5)}px;
    flex-shrink: 1;
  `;

  const Inner = styled.Pressable`
    flex-direction: row;
    align-self: center;
    margin-left: ${moderateScale(5)}px;
    flex-shrink: 1;
  `;

  return (
    <TaskContainer>
      <Inner onPress={() => setCheck(index)}>
        <MaterialIcons
          name={isChecked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={hideAdd ? "white" : "#7D5A50"}
          style={{ alignSelf: "center" }}
        />
        <TitleText>{title}</TitleText>
      </Inner>
      <AntDesign
        name="delete"
        size={24}
        color={hideAdd ? "white" : "#7D5A50"}
        style={{ alignSelf: "center", marginRight: moderateScale(10) }}
        onPress={() => setRemove(index)}
      />
    </TaskContainer>
  );
};

const AddTodos = ({ HandleAddTask }) => {
  const height = useHeaderHeight();

  const textInputRef = useRef(null);

  // ref
  const Container = styled.KeyboardAvoidingView`
    flex-direction: row;
    margin-bottom: 30px;
    justify-content: space-between;
  `;

  return (
    <Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 20}
    >
      <TextInput
        ref={textInputRef}
        placeholder="Add your task/notes here!"
        placeholderTextColor="grey"
        style={{
          borderRadius: 10,
          width: "80%",
          height: verticalScale(40),
          borderColor: "white",
          borderWidth: 1,
          marginLeft: moderateScale(15),
          paddingLeft: moderateScale(5),
          color: "white",
        }}
        maxLength={88}
        onChangeText={(text) => {
          textInputRef.current.value = text;
        }}
      />
      <LinearGradient
        colors={["#ffcf64", "#FC9187"]}
        style={{
          borderRadius: 15,
          marginRight: moderateScale(15),
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
          onPress={() => {
            if (textInputRef.current.value != null) {
              HandleAddTask(textInputRef.current.value);
            }
          }}
        />
      </LinearGradient>
    </Container>
  );
};

function arrayRemove(arr, value) {
  return arr.filter((v, index) => {
    return index != value;
  });
}

const MemoizedTodo = React.memo(AddTodos, (prev, next) => false);
const TodoList = ({ tasks, HandleCheckTask, HandleRemoveTask, hideAdd }) => {
  const IntroText = styled.Text`
    font-family: System;
    font-size: ${moderateScale(25)}px;
    text-align: center;
    color: white;
    margin-left: ${moderateScale(25)}px;
    margin-right: ${moderateScale(25)}px;
  `;
  const navigation = useNavigation();
  return (
    <View onStartShouldSetResponder={() => true}>
      {tasks.length != 0 ? (
        tasks.map(({ title, isChecked }, index) => {
          return (
            <Task
              title={title}
              isChecked={isChecked}
              indexProp={index}
              setCheck={HandleCheckTask}
              setRemove={HandleRemoveTask}
              key={index}
              hideAdd={hideAdd}
            />
          );
        })
      ) : (
        <View>
          {hideAdd != true ? (
            <View>
              <LottieView
                source={require("../../../assets/Todo.json")}
                autoPlay
                loop={false}
                speed={0.4}
                style={{
                  position: "relative",
                  alignSelf: "center",
                  width: moderateScale(300),
                  height: moderateScale(300),
                }}
              />
              <IntroText>Add your task/note below to get started!</IntroText>
            </View>
          ) : (
            <Button
              title="  Add Tasks!"
              titleStyle={{
                color: "white",
                fontSize: moderateScale(16.5),
              }}
              containerStyle={{
                marginTop: verticalScale(60),
                alignSelf: "center",
                borderColor: "rgb(90,90,90)",
                borderWidth: 2,
                borderRadius: 15,
              }}
              buttonStyle={{
                backgroundColor: "rgb(50,50,50)",
                borderRadius: 15,
              }}
              icon={
                <FontAwesome5
                  name="clipboard-list"
                  size={moderateScale(18)}
                  color="white"
                />
              }
              onPress={() =>
                navigation.navigate("Tools", { navigateTo: "My Tasks" })
              }
            />
          )}
        </View>
      )}
    </View>
  );
};
export default function Todo({ hideAdd }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function ReadTasks() {
      const tasksArr = JSON.parse(await AsyncStorage.getItem("@tasks"));
      if (tasksArr != null) {
        setTasks(tasksArr);
      }
    }
    ReadTasks();
  }, []);

  const HandleAddTask = useCallback(async (task) => {
    const newTask = { title: task, isChecked: false };
    const newArr = [...tasks, newTask];
    await AsyncStorage.setItem("@tasks", JSON.stringify(newArr));
    setTasks(newArr);
  });

  const Container = styled.View`
    flex: 1;
    ${hideAdd ? "background-color: black;" : "background-color: #121212;"}
    justify-content: flex-end;
    ${hideAdd ? "border-bottom-right-radius: 20px;" : null}
    ${hideAdd ? "border-bottom-left-radius: 20px;" : null}
  `;

  const HandleRemoveTask = async (id) => {
    const taskCopy = arrayRemove(tasks, id);
    setTasks(taskCopy);
    await AsyncStorage.setItem("@tasks", JSON.stringify(taskCopy));
  };

  const HandleCheckTask = async (index) => {
    let newTask = tasks[index];
    let newTasks = [...tasks];
    newTask["isChecked"] = !newTask["isChecked"];
    newTasks.splice(index, 1, newTask);
    setTasks(newTasks);
    await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ScrollView style={{ flex: 1 }}>
          <TodoList
            tasks={tasks}
            HandleCheckTask={HandleCheckTask}
            HandleRemoveTask={HandleRemoveTask}
            hideAdd={hideAdd}
          />
        </ScrollView>
        {hideAdd ? <View /> : <MemoizedTodo HandleAddTask={HandleAddTask} />}
      </Container>
    </TouchableWithoutFeedback>
  );
}
