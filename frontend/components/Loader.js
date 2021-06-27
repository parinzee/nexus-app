import React from "react";
import { useState, useEffect} from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native";

export default function Loader({navigation}) {
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {setTimeout(() => {navigation.navigate("Home")}, 1000)});
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return (
        <Image
            source={require("../assets/intro.gif")}
            style={{ width: windowWidth, height: windowHeight }}
        ></Image>
    );
};
