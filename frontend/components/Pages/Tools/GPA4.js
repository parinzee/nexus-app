import React, { useState, useEffect } from "react";
import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, verticalScale } from "react-native-size-matters";

const handleGPA = async (grade) => {
  await AsyncStorage.setItem("@GPA", JSON.stringify(grade));
};

const readHtml = async (path) => {
  const HTML = await FileSystem.readAsStringAsync(path);
  return HTML;
};

const Standards = ({ assets }) => {
  const HTML = { html: assets[1] };
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    position: absolute;
  `;

  return (
    <WebView
      style={{ flex: 1, backgroundColor: "#121212" }}
      source={HTML}
      onMessage={(event) => handleGPA(event.nativeEvent.data)}
      startInLoadingState={true}
      renderLoading={() => <Container />}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      allowFileAccess={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
    />
  );
};

const Honors = ({ assets }) => {
  const HTML = { html: assets[0] };
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
    position: absolute;
  `;
  return (
    <WebView
      style={{ flex: 1, backgroundColor: "#121212" }}
      source={HTML}
      onMessage={(event) => handleGPA(event.nativeEvent.data)}
      startInLoadingState={true}
      renderLoading={() => <Container />}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      allowFileAccess={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
    />
  );
};

export default function GPA4({ route }) {
  const [assets] = useAssets([
    require("../../../assets/Honors.html"),
    require("../../../assets/Standards.html"),
  ]);
  const { grade, honors } = route.params;
  const [honorsManual, setHonorsManual] = useState(null);
  const [uris, setUris] = useState([]);
  const Container = styled.View`
    flex: 1;
    background-color: #121212;
  `;

  const AnotherContainer = styled.View`
    flex: 1;
    background-color: #121212;
    justify-content: center;
    align-items: center;
  `;

  const InnerChooser = styled.View`
    justify-content: center;
    margin-horizontal: ${moderateScale(40)}px;
  `;

  const AskText = styled.Text`
    font-family: System;
    font-size: ${moderateScale(25)}px;
    color: white;
    text-align: center;
    margin-bottom: ${verticalScale(30)}px;
  `;

  useEffect(() => {
    async function getUris() {
      const honorsHTML = await readHtml(assets[0].localUri);
      const standardsHTML = await readHtml(assets[1].localUri);
      setUris([honorsHTML, standardsHTML]);
    }
    if (assets) {
      getUris();
    }
  }, [assets]);

  if (!assets) {
    return <Container />;
  } else if (grade < 9 && grade != null) {
    return (
      <Container>
        <Standards assets={uris} />
      </Container>
    );
  } else if (honors === true || honorsManual === true) {
    return (
      <Container>
        <Honors assets={uris} />
      </Container>
    );
  } else if ((honors === false && grade != null) || honorsManual === false) {
    return (
      <Container>
        <Standards assets={uris} />
      </Container>
    );
  } else {
    return (
      <AnotherContainer>
        <InnerChooser>
          <AskText>Which scale do you want to use?</AskText>
          <Button
            title="Standards Scale"
            containerStyle={{ marginBottom: verticalScale(20) }}
            buttonStyle={{
              backgroundColor: "#f2e1c1",
            }}
            titleStyle={{
              color: "black",
            }}
            onPress={() => setHonorsManual(false)}
          />
          <Button
            title="Honors Scale"
            buttonStyle={{
              backgroundColor: "#f2e1c1",
            }}
            titleStyle={{
              color: "black",
            }}
            onPress={() => setHonorsManual(true)}
          />
        </InnerChooser>
      </AnotherContainer>
    );
  }
}
